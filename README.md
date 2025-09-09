# logzone_sdk
Logzone SDK - Embed the Leadzone SDK

Como usar o SDK em seu projeto:



const LogZoneSDK = require('logzone-sdk');

const sdk = new LogZoneSDK({
  apiKey: 'SEU_TOKEN_AQUI'
});

(async () => {
  const projetos = await sdk.listarProjetos();
  console.log('Projetos recebidos:', projetos);
})();