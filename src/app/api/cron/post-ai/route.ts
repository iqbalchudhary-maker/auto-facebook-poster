import { NextResponse } from 'next/server';
import { generateAIPostAndPrompt } from "@/lib/gemini";

export const maxDuration = 60; 

export async function GET() {
  try {
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const HF_TOKEN = process.env.HF_TOKEN; // <--- Aapka .env wala naam

    if (!PAGE_ID || !ACCESS_TOKEN || !HF_TOKEN) {
      return NextResponse.json({ error: "Variables Missing" }, { status: 500 });
    }

    // 1. Gemini se Content aur Prompt lein
    const aiData = await generateAIPostAndPrompt();

    // 2. Hugging Face se Image Generate karein
    const imgRes = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: aiData.image_prompt }),
      }
    );

    if (!imgRes.ok) throw new Error("HF Image Generation Failed");

    const imageBlob = await imgRes.blob();
    
    // 3. Facebook API (Photos Endpoint)
    const formData = new FormData();
    formData.append('source', imageBlob, 'post.jpg');
    formData.append('message', aiData.post_text);
    formData.append('access_token', ACCESS_TOKEN);

    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/photos`, {
      method: 'POST',
      body: formData,
    });

    const result = await fbRes.json();

    return NextResponse.json({ success: true, id: result.id });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}