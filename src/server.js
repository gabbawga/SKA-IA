const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

// Rota principal (opcional)
app.get('/', (req, res) => {
    res.send('Bem-vindo à API do Chat HelpDesk!');
});

// Manipulação de erros (opcional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Algo deu errado!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
