import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    console.log("--- DEBUG START ---");
    
    // Check Variables
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

    console.log("Checking Env Vars...");
    console.log("FB_PAGE_ID:", PAGE_ID ? "✅ Loaded" : "❌ MISSING");
    console.log("FB_TOKEN:", ACCESS_TOKEN ? "✅ Loaded" : "❌ MISSING");

    if (!PAGE_ID || !ACCESS_TOKEN) {
      console.error("CRITICAL ERROR: Environment Variables are missing in Vercel Settings!");
      return NextResponse.json({ 
        success: false, 
        error: "Variables Missing. Check Vercel Dashboard Settings > Environment Variables." 
      }, { status: 500 });
    }

    // AI Message
    const aiMessage = "AI Automation Test 🤖\nStatus: Online\nTime: " + new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

    console.log("Sending request to Facebook API...");

    const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: aiMessage,
        access_token: ACCESS_TOKEN,
      }),
    });

    const result = await fbResponse.json();

    if (result.error) {
      console.error("Facebook API Error Detail:", result.error);
      return NextResponse.json({ success: false, error: result.error.message }, { status: 400 });
    }

    console.log("--- SUCCESS! Post ID:", result.id, "---");
    
    return NextResponse.json({ 
        success: true, 
        message: "Post shared successfully!", 
        post_id: result.id 
    });

  } catch (error: any) {
    console.error("Final Cron Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}