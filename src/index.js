const axios = require('axios');

class LogZoneSDK {
  constructor({ apiUrl, apiKey }) {
    this.apiUrl = apiUrl || process.env.BASE_API_URL || 'http://localhost:3000/api/v1';
    this.apiKey = apiKey || process.env.API_KEY || null;

    if (!this.apiUrl) {
      throw new Error('É necessário definir o apiUrl para inicializar o SDK.');
    }
  }

  /**
   * Cria um novo log
   * @param {Object} logData - Dados do log
   * @param {string} logData.project - ID do projeto
   * @param {string} logData.level - Nível do log (ex: error, info, warn)
   * @param {string} logData.message - Mensagem do log
   * @param {string} [logData.context] - Contexto adicional do log
   */
  async criarLog(logData) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/logs`,
        logData,
        {
          headers: this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}
        }
      );

      // Debug no terminal
      console.log('Log criado com sucesso:', response.data);

      return response.data;
    } catch (error) {
      console.error('Erro ao criar log:', error.message);
      if (error.response) {
        console.error('Detalhes:', error.response.data);
      }
      throw error;
    }
  }
}

module.exports = LogZoneSDK;
