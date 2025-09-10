const LogZoneSDK = require('./src/index.js'); // ou @danielfabbri/logzone-sdk se publicar com scope
const sdk = new LogZoneSDK();

async function main() {
  try {
    await sdk.createLog({
      apiKey: '4fab9e38303027a111221df61aff9d1d8596948ffd8a0e4a8468004e902b55ab',
      project: '68c1740fcc5ca267dcb0e97a',
      level: 'error',
      message: 'Failed to authenticate user 333',
      context: 'Invalid JWT token received at /login'
    });
  } catch (err) {
    console.error('Erro ao enviar log:', err.message);
  }
}

main();