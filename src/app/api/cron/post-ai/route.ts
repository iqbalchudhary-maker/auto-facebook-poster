import { NextResponse } from 'next/server';
import { generateAIPostAndPrompt } from "@/lib/gemini";

export const maxDuration = 60; 

export async function GET() {
  try {
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const HF_TOKEN = process.env.HF_TOKEN;

    if (!PAGE_ID || !ACCESS_TOKEN || !HF_TOKEN) {
      return NextResponse.json({ success: false, error: "Missing Environment Variables" }, { status: 500 });
    }

    console.log("Step 1: Generating AI Content...");
    const aiData = await generateAIPostAndPrompt();
    
    console.log("Step 2: Generating Image (Using NEW Hugging Face Router)...");
    // Yeh naya official URL hai jo Hugging Face ne mangaya hai
    const imgRes = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: { 
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: aiData.image_prompt,
          options: { wait_for_model: true } 
        }),
      }
    );

    if (!imgRes.ok) {
      const errorDetail = await imgRes.text();
      throw new Error(`Hugging Face Error: ${imgRes.status} - ${errorDetail}`);
    }

    const imageBlob = await imgRes.blob();
    console.log("✅ Image Ready. Size:", imageBlob.size);

    console.log("Step 3: Posting to Facebook...");
    const formData = new FormData();
    const imageFile = new File([imageBlob], "post.jpg", { type: "image/jpeg" });
    
    formData.append('source', imageFile);
    formData.append('message', aiData.post_text);
    formData.append('access_token', ACCESS_TOKEN);

    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/photos`, {
      method: 'POST',
      body: formData,
    });

    const result = await fbRes.json();

    if (result.error) throw new Error(result.error.message);

    return NextResponse.json({ 
      success: true, 
      message: "Final Success! Post with Image is LIVE.", 
      post_id: result.id 
    });

  } catch (error: any) {
    console.error("Final Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}