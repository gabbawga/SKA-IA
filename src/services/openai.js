const { OpenAI } = require('openai');

// Função para contar uma estimativa do número de tokens
function estimateTokens(text) {
    // Aproximadamente 4 bytes por palavra para inglês
    // Este valor pode ser ajustado conforme necessário para maior precisão
    return Math.floor(text.length / 4);
}

// Verificar se a chave da API está sendo carregada corretamente
console.log("Chave da API OpenAI:", process.env.OPENAI_API_KEY);

// Configuração do cliente OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Função para gerar respostas com controle de tokens
async function generateAnswer(context, question) {
    try {
        // Estimativa de tokens para o contexto e a pergunta
        const contextTokens = estimateTokens(context);
        const questionTokens = estimateTokens(question);
        const totalTokens = contextTokens + questionTokens;

        // Limite de tokens para o modelo GPT-3.5 Turbo
        const MAX_TOKENS = 16385;

        // Se o número total de tokens for muito alto, ajustar o contexto
        if (totalTokens > MAX_TOKENS) {
            console.log("Total de tokens muito alto, truncando contexto...");
            const truncatedContext = context.slice(0, MAX_TOKENS - questionTokens); // Ajusta o contexto para caber com a pergunta
            context = truncatedContext; // Atualiza o contexto com o truncado
        }

        // Chama a API OpenAI para gerar a resposta
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Você é um assistente útil que ajuda a resolver dúvidas técnicas." },
                { role: "user", content: context },
                { role: "user", content: question }
            ],
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Erro ao chamar a API OpenAI:", error.message);
        throw new Error("Erro ao processar a pergunta. Tente novamente.");
    }
}

module.exports = { generateAnswer };
