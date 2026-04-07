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
  Task: Generate a Facebook post text and an image generation prompt.

  **Instruction for Post Text (Message):**
  Keep the message detailed, professional, and informative, explaining my full stack (Next.js/React, SaaS) and AI automation skills (ERPs, automated marketing, chatbots). The goal is to present me as an expert. Include the elements below in the text.

  **Instruction for Image Generation Prompt:**
  Do NOT generate a simple workspace. Instead, generate a highly detailed, professional, cinematic 3D advertisement image (like a premium SaaS dashboard) that visually represents "The Power of my AI & Full Stack Skills."

  **Details to Include (in both Text and Image):**
  1.  **WhatsApp:** +923010637955
  2.  **Portfolio Links:** Vercel (e.g., yourname.vercel.app) and PAIB (e.g., yourname.paib.com) (Use placeholders like '[Vercel Link]' and '[PAIB Link]' in the text, and design them into the image).
  3.  **Proof of Automation (Crucial):** A section or text on the image explicitly states: "**This Post & Image were 100% Automated by My AI**."

  **Visual Style for Image:**
  Futuristic, clean, midnight blue and neon cyan lighting, 8k resolution, ultra-detailed textures, photographic realism with glowing holographic elements.

  **Required Output Format:**
  Return ONLY a JSON object with this exact structure:
  {
    "post_text": "Detailed professional message content here",
    "image_prompt": "Ultra-detailed visual description of the advertisement here"
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