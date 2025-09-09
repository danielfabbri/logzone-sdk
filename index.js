const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_URL = process.env.BASE_API_URL || 'http://localhost:3000/api/v1';


// Rota Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rota para testar requisição GET para a sua API
app.get('/test-projects', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/projects`); // <--- aqui
    
    // Mostra a resposta no terminal
    console.log('Resposta da API:', response.data);
    
    // Retorna algo para o cliente (opcional)
    res.json({
      message: 'Requisição GET feita com sucesso!',
      data: response.data
    });
  } catch (error) {
    console.error('Erro ao conectar com a API:', error.message);
    res.status(500).json({ error: 'Erro ao conectar com a API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
