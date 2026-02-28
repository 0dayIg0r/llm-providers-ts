import Anthropic from '@anthropic-ai/sdk';

export function createAnthropicClient() {
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY não encontrada nas variáveis de ambiente');
    }

    return new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });
}
