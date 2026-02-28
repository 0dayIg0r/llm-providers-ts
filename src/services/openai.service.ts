import OpenAI from 'openai';

export function createOpenAIClient() {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY não encontrada nas variáveis de ambiente');
    }

    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}
