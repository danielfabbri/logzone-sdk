# logzone_sdk
Logzone SDK - Embed the Leadzone SDK

Como usar o SDK em seu projeto:



const MeuLoggerSDK = require('meu-logger-sdk');

const sdk = new MeuLoggerSDK({
  apiUrl: 'http://localhost:3000/api/v1',
  apiKey: 'SEU_TOKEN_AQUI'
});

(async () => {
  const projetos = await sdk.listarProjetos();
  console.log('Projetos recebidos:', projetos);
})();