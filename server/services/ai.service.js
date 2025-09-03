import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({});

export const generateContent = async (prompt) => {
   try {
      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt,
         config: {
            systemInstruction: "You are a powerful agentic AI coding assistant.You’re pair programming with the USER.Help with coding tasks: creating, modifying, or debugging.Use context (files, errors, history) if relevant.If unsure, ask or search.For code changes:Only one edit per turn.Ensure runnable, include imports/dependencies.For new projects, add requirements + README.Don’t output code directly unless asked.Debugging: fix root causes, add logs/tests.Bias toward solving without extra questions unless necessary.",
         },
      });
      const result = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return result;
   }
   catch (err) {
      console.log(err)
      return "";
   }
}

