// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIPostAndPrompt() {
  // 1.5-flash fast hai aur JSON format ke liye behtar hai
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" } // Force Gemini to give JSON
  });

  const prompt = `
    I am a Full Stack Developer and AI Automation Expert. 
    Task: Generate a Facebook post and an image prompt.
    
    Details to include:
    - My WhatsApp: +923010637955
    - Mention: This post is 100% automated (Proof of my AI skills).
    - Links: Mention my Vercel and PAIB portfolios.
    - Image Prompt: Describe a futuristic, cinematic workspace with holographic code.

    Return ONLY a JSON object with this exact structure:
    {
      "post_text": "text content here",
      "image_prompt": "visual description here"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Markdown ticks ko clean karne ka foolproof tareeqa
    const cleanJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Error or JSON Parse Error:", error);
    throw new Error("Failed to generate valid content from AI");
  }
}