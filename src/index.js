const axios = require('axios');
require('dotenv').config();


class LogZoneSDK {
  
  async createLog(logData) {
    const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3000/api/v1";

    try {
      const response = await axios.post(
        `${BASE_API_URL}/logs`,
        logData
      );
      console.log('Log criado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar log:',BASE_API_URL, error.message);
      if (error.response) {
        console.error('Detalhes:', error.response.data);
      }
      throw error;
    }
  }
}

module.exports = LogZoneSDK;
