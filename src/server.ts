import express from 'express';
import cors from 'cors';
import llmRoutes from './routes/llm.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/llm', llmRoutes);

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', error.message);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        message: `A rota ${req.method} ${req.path} não existe`
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Endpoints disponíveis:`);
    console.log(`   GET /api/llm/openai`);
    console.log(`   GET /api/llm/anthropic`);
    console.log(`   GET /api/llm/xai`);
    console.log(`   GET /api/llm/google`);
    console.log(`   GET /api/llm/groq`);
    console.log(`   GET /api/llm/ollama`);
});
