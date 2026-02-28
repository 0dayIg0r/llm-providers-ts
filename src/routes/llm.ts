import express from "express";
import {
  createOpenAIClient,
  createAnthropicClient,
  createXAIClient,
  createGoogleClient,
  createGroqClient,
  createOllamaClient,
} from "../services/index.js";
import { generateText } from "ai";
import { bookFinder } from "../services/openai.service.js";

const router = express.Router();

// Route para OpenAI
router.get("/openai", async (req, res) => {
  const client = createOpenAIClient();

  const book = await bookFinder("um livro sobre inteligência artificial para iniciantes");
  res.json({ book });   

//   const response = await client.responses.create({
//     model: "gpt-4o",
//     input: [
//       {
//         role: "system",
//         content:
//           "Você é um assistente de programação e evita ao máximo responder errado.",
//       },
//       {
//         role: "user",
//         content: "Crie uma função com Js pra mim!",
//       },
//     ],
//   });
//   res.json({ output: response.output_text });
});

// Route para Anthropic (Claude)
router.get("/anthropic", async (req, res) => {
  try {
    const client = createAnthropicClient();

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-latest", // ajuste conforme seu plano/modelos
      max_tokens: 1000,
      system:
        "Você é um assistente de programação e evita ao máximo responder errado.",
      messages: [{ role: "user", content: "Crie uma função com JS pra mim!" }],
    });

    const text =
      response.content
        ?.filter((b) => b.type === "text")
        ?.map((b) => b.text)
        ?.join("\n") ?? "";

    return res.json({ output: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Falha ao chamar Anthropic" });
  }
});
// Route para xAI (Grok)
router.get("/xai", async (req, res) => {
  const client = createXAIClient();

  const { text } = await generateText({
    model: "grok-3.5-pro",
    system:
      "Você é um assistente de programação e evita ao máximo responder errado.",
    messages: [
      {
        role: "user",
        content: "Crie uma função com JS pra mim!",
      },
    ],
  });
  res.json({ message: text });
});

// Route para Google AI (Gemini)
router.get("/google", async (req, res) => {
  const client = createGoogleClient();
  const model = client.getGenerativeModel({ model: "gemini-2.0-pro" });

  const response = await model.generateContent({
    systemInstruction:
      "Você é um assistente de programação e evita ao máximo responder errado.",
    contents: [
      {
        role: "user",
        parts: [{ text: "Crie uma função com Js pra mim!" }],
      },
    ],
  });
  res.json({
    output: response.response.text(),
  });
});

// Route para Groq
router.get("/groq", async (req, res) => {
  const client = createGroqClient();
  const response = await client.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "user",
        content: "Crie uma função com JS pra mim!",
      },
    ],
  });
  res.json({ output: response.choices[0]?.message?.content ?? "" });
});

// Route para Ollama
router.get("/ollama", async (req, res) => {
  const client = createOllamaClient();
  const response = await client.chat({
    model: "llama3",
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente de programação e evita ao máximo responder errado.",
      },
      {
        role: "user",
        content: "Crie uma função com JS pra mim!",
      },
    ],
  });
  res.json({
    output: response.message.content,
  });
});

export default router;
