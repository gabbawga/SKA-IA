const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Espera por um seletor específico (alterar para um seletor relevante da página)
        await page.waitForSelector('body');  // Espera até que o corpo da página esteja carregado

        // Extrai todo o texto visível da página
        const contextData = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('body *'));
            return items.map(item => item.innerText)
                .filter(text => typeof text === 'string' && text.trim() !== ''); // Verifica se é string e não está vazio
        });

        await browser.close();

        return contextData;
    } catch (error) {
        console.error('Erro ao fazer scraping:', error.message);
        throw new Error('Erro ao fazer scraping.');
    }
}

const url = 'http://synecoapp.ska.com.br:100/';

scrapeWebsite(url).then(contextData => {
    console.log('Dados extraídos do site:', contextData);
}).catch(error => {
    console.error('Erro ao fazer o scraping:', error.message);
});

module.exports = { scrapeWebsite };


// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeWebsite(url) {
//     try {
//         const { data } = await axios.get(url);
//         const $ = cheerio.load(data);

//         // Exemplo de extração de links
//         const links = [];
//         $('a').each((_, element) => {
//             const link = $(element).attr('href');
//             if (link) links.push(link);
//         });

//         // Retornar os links ou outros dados necessários
//         return links;
//     } catch (error) {
//         console.error(`Erro ao fazer scraping: ${error.message}`);
//         throw error;
//     }
// }

// module.exports = { scrapeWebsite };