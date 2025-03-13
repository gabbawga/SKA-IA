const express = require('express');
const { generateAnswer } = require('../services/openai');
const { scrapeWebsite } = require('../services/scraper');

const router = express.Router();

// Rota para enviar perguntas e obter respostas
router.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ success: false, message: "A pergunta é obrigatória." });
    }

    try {
        // Realizar scraping e construir o contexto
        const url = 'http://synecoapp.ska.com.br:100/';
        const contextData = await scrapeWebsite(url);
        const context = `Base de conhecimento extraída do site: ${contextData.join('\n')}`;

        // Gerar resposta usando a OpenAI
        const answer = await generateAnswer(context, question);
        res.json({ success: true, answer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
