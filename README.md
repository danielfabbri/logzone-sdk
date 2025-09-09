# logzone-sdk
Logzone SDK - Embed the Leadzone SDK

Como usar o SDK em seu projeto:



const LogZoneSDK = require('./src/index.js');

const sdk = new LogZoneSDK({
  apiUrl: 'http://localhost:3000/api/v1',
  apiKey: 'SUA_API_KEY' // se a API exigir
});

async function main() {
  try {
    await sdk.criarLog({
      project: '64f123abc456def789012345',
      level: 'error',
      message: 'Failed to authenticate user 222',
      context: 'Invalid JWT token received at /login'
    });
  } catch (err) {
    console.error('Erro ao enviar log:', err.message);
  }
}

main();