import { NextResponse } from 'next/server';
import { generateAIPostAndPrompt } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  // 1. Security Check for Vercel Cron
  // Jab aap local testing karein, toh is block ko comment kar sakte hain.
  // Lekin Vercel par deploy karte waqt ise ON rehna chahiye.
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 2. Clean Environment Variables (Removing extra spaces)
    const fbPageId = process.env.FB_PAGE_ID?.trim();
    const fbAccessToken = process.env.FB_ACCESS_TOKEN?.trim();
    const hfToken = process.env.HF_TOKEN?.trim();

    // 3. Ask Gemini for the Post Text and Image Prompt
    const aiData = await generateAIPostAndPrompt();
    console.log("AI Content Generated:", aiData.post_text.substring(0, 50) + "...");

    // 4. Generate Image via Hugging Face Router API
    const hfModel = "stabilityai/stable-diffusion-xl-base-1.0"; 
    
    const hfResponse = await fetch(`https://router.huggingface.co/hf-inference/models/${hfModel}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: aiData.image_prompt }),
    });

    if (!hfResponse.ok) {
      const errorDetails = await hfResponse.text();
      console.error("Hugging Face Detail Error:", errorDetails);
      throw new Error(`HF Error: ${hfResponse.status} - ${errorDetails}`);
    }

    // 5. Prepare Data for Facebook (Using FormData for Image Upload)
    const imageBlob = await hfResponse.blob();
    const fbFormData = new FormData();
    fbFormData.append('access_token', fbAccessToken!);
    fbFormData.append('message', aiData.post_text);
    fbFormData.append('source', imageBlob, 'ai-post.png'); 

    // API Version v25.0 use kar rahe hain (Latest)
    const fbUrl = `https://graph.facebook.com/v25.0/${fbPageId}/photos`;
    
    const fbPostResponse = await fetch(fbUrl, {
      method: 'POST',
      body: fbFormData,
    });

    const fbResult = await fbPostResponse.json();

    if (!fbPostResponse.ok) {
      throw new Error(`Facebook API Error: ${JSON.stringify(fbResult)}`);
    }

    // 6. Save to NeonDB via Prisma
    await prisma.post.create({
      data: {
        content: aiData.post_text,
        fbPostId: fbResult.id, 
        imageUrl: `https://graph.facebook.com/${fbResult.id}/picture`, 
      },
    });

    return NextResponse.json({ 
      message: "Successfully posted to Facebook with image!",
      fbId: fbResult.id 
    });

  } catch (error) {
    console.error("Cron Error Detail:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}