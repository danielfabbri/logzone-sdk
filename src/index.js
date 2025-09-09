const axios = require('axios');

class MeuLoggerSDK {
  constructor({ apiUrl, apiKey }) {
    this.apiUrl = apiUrl || process.env.BASE_API_URL || 'http://localhost:3000/api/v1';
    this.apiKey = apiKey || process.env.API_KEY || null;

    if (!this.apiUrl) {
      throw new Error('É necessário definir o apiUrl para inicializar o SDK.');
    }
  }

  /**
   * Lista os projetos da API
   */
  async listarProjetos() {
    try {
      const response = await axios.get(`${this.apiUrl}/projects`, {
        headers: this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}
      });

      // Mostra no terminal (debug)
      console.log('Resposta da API:', response.data);

      return response.data;
    } catch (error) {
      console.error('Erro ao conectar com a API:', error.message);
      throw error;
    }
  }
}

module.exports = MeuLoggerSDK;
