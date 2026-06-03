import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Check if API key is present
      if (!process.env.GEMINI_API_KEY) {
        return res.json({ 
          text: `Hello! I am your bariatric advisor here to support you. Currently, the local environment API key is initializing, but here is what you need to know about your request: Pre-operatively, the combined bariatric sleeve & hysterectomy cohort program (led by Dr. Joannie Neveu and Dr. David Pace) requires you to maintain daily diet diaries (Stage 3 Full Fluid is a key example phase for 4 weeks post-op, while Stage 1 is portion control). Please keep protein targets above 60g for women / 80g for men, and strictly avoid straw usage in Full Fluids to protect against pouch bloating.`
        });
      }

      // Prepare system instruction
      const systemInstruction = `You are a clinical virtual bariatric advisor helping patients coordinate their upcoming combined gastric sleeve and hysterectomy program at NLHS. 
The clinical leads are Dr. Joannie Neveu (Gynecologic oncologist surgeon) and Dr. David Pace (Bariatric surgical director).
The coordinator is nurse Amy Moore, and Nadine Glynn is the pharmacist.

Guidelines for your answers:
- Answer warm, professional, extremely clear, empathetic, and precise, like a caring clinic advisor speaking to a patient.
- Provide factual, evidence-based guidelines on pre-op/post-op care, including diet stages and physical preparation.
- Direct patients to Area D (Floor 4) of our hospital for physical consults.
- Emphasize our multidisciplinary comprehensive clinical team approach: "Our medical team works as a cohesive joint practice to ensure the safest, most unified cancer prevention and metabolic surgical care."
- Keep responses nicely formatted in readable bullets or short paragraphs. Avoid tech jargon or mention of API keys, keys, code, or databases. Give human, clinical-standard support.`;

      const contentsParts: any[] = [];
      if (Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsParts.push({
            role: h.sender === "patient" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      contentsParts.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsParts,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError);
      res.status(500).json({ error: apiError.message || "External advisor error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
