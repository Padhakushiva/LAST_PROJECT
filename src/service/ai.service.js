const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateResponse(prompt) {
  

  const res = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return (res && typeof res.text === "string" ? res.text : "").trim();
}

module.exports={generateResponse};