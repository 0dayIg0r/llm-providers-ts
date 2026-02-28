import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { text } from "stream/consumers";
import z from "zod";

export function createOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não encontrada nas variáveis de ambiente");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export const bookFinder = async (search: string) => {
  const bookFinderSchema = z.object({
    title: z.string(),
    author: z.string(),
  });

  const client = createOpenAIClient();

  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "Você é um assistente de biblioteca que ajuda a encontrar livros com base em uma descrição ou indica algum livro. Responda apenas com o título e o autor do livro, caso seja pedido uma indicação de livro, faça uma descrição do livro bem básica.",
      },
      {
        role: "user",
        content: `Encontre um livro com a seguinte descrição: ${search}`,
      },
    ],
    response_format: zodTextFormat(bookFinderSchema, 'event'),
  });

  return response.output_parsed ?? null
};



export const imageAnalyzer =  async (imageUrl: string) => {
  const client = createOpenAIClient();

  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "Você é um assistente de análise de imagens. Analise a imagem fornecida e descreva seu conteúdo.",
      },
      {
        role: "user",
        content: `Analise a seguinte imagem: ${imageUrl}`,
      },
    ],
    response_format: zodTextFormat(z.string(), 'event'),
  });

  return response.output_parsed ?? null
}