import { Ollama } from 'ollama';

export function createOllamaClient() {
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

    return new Ollama({
        host: baseUrl,
    });
}
