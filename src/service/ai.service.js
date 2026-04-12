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

async function generatevector(content){
  const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: content,
      config: {
        outputDimensionality: 768
      }
  });

  return response.embeddings;
}

module.exports={generateResponse,generatevector};