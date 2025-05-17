const axios = require('axios');
require('dotenv').config();

async function loadRemoteConfig() {
  const appName = process.env.APP_NAME || 'vendas-flux-frontend';
  const profile = process.env.NODE_ENV || 'dev';
  const configServerUrl = process.env.CONFIG_SERVER_URL || 'http://config-server-production.up.railway.app';

  const url = `${configServerUrl}/${appName}/${profile}`;

  try {
    const response = await axios.get(url);
    const config = {};
    const propertySources = response.data.propertySources || [];

    for (const source of propertySources) {
      Object.assign(config, source.source);
    }

    return config;
  } catch (error) {
    console.error('❌ Erro ao buscar configuração do Config Server:', error.message);
    throw error;
  }
}

module.exports = { loadRemoteConfig };
