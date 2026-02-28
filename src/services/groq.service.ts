import Groq from 'groq-sdk';

export function createGroqClient() {
    if (!process.env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY não encontrada nas variáveis de ambiente');
    }

    return new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
}
