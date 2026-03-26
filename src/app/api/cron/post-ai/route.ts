import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Vercel ko 60 seconds tak wait karne ka kahein (AI slow ho sakta hai)
export const maxDuration = 60; 

export async function GET(request: Request) {
  try {
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!PAGE_ID || !ACCESS_TOKEN || !GEMINI_KEY) {
      return NextResponse.json({ error: "Missing Environment Variables" }, { status: 500 });
    }

    // 1. Gemini AI se Content likhwana
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Write a professional and engaging Facebook post about AI Automation and Future Tech. Include 5 trending hashtags and emojis.";
    
    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text();

    console.log("AI Content Generated:", aiMessage);

    // 2. Facebook par Post karna
    const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: aiMessage,
        access_token: ACCESS_TOKEN,
      }),
    });

    const fbData = await fbResponse.json();

    if (fbData.error) {
      return NextResponse.json({ success: false, error: fbData.error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Proper AI Post Shared!", 
      id: fbData.id 
    });

  } catch (error: any) {
    console.error("Cron Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}