import { createXai } from '@ai-sdk/xai';

export function createXAIClient() {
    if (!process.env.XAI_API_KEY) {
        throw new Error('XAI_API_KEY não encontrada nas variáveis de ambiente');
    }

    return createXai({
        apiKey: process.env.XAI_API_KEY
    })
}