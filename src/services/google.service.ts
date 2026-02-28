import { GoogleGenerativeAI } from '@google/generative-ai';

export function createGoogleClient() {
    if (!process.env.GOOGLE_API_KEY) {
        throw new Error('GOOGLE_API_KEY não encontrada nas variáveis de ambiente');
    }

    return new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
}
