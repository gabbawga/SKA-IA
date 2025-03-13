const express = require('express');
const { scrapeWebsite } = require('../services/scraper');

const router = express.Router();

// Rota para obter os links do site
router.get('/scrape', async (req, res) => {
    const url = 'http://synecoapp.ska.com.br:100/';
    try {
        const data = await scrapeWebsite(url);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
