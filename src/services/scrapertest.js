const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeWebsite(url) {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Espera por um seletor específico
        await page.waitForSelector('body');

        // Extrai todo o texto visível da página
        const contextData = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('body, p, article, div'));
            return items.map(item => item.innerText.trim()).filter(text => text !== '');
        });

        await browser.close();

        return contextData;
    } catch (error) {
        console.error('Erro ao fazer scraping:', error.message);
        throw new Error('Erro ao fazer scraping.');
    }
}

const url = 'http://synecoapp.ska.com.br:100/';

scrapeWebsite(url)
    .then(contextData => {
        const filePath = 'dados_extraidos.txt';

        // Escreve os dados extraídos no arquivo .txt
        fs.writeFileSync(filePath, contextData.join('\n\n'), 'utf-8');

        console.log(`✅ Dados extraídos salvos em: ${filePath}`);
    })
    .catch(error => {
        console.error('❌ Erro ao fazer o scraping:', error.message);
    });
