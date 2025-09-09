const LogZoneSDK = require('./src');

const sdk = new LogZoneSDK({
  apiUrl: 'http://localhost:3000/api/v1',
  apiKey: 'SEU_API_KEY_AQUI'
});

(async () => {
  try {
    const projetos = await sdk.listarProjetos();
    console.log('Projetos:', projetos);
  } catch (err) {
    console.error(err);
  }
})();
