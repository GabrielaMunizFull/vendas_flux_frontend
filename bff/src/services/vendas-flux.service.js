const axios = require('axios');
const { loadRemoteConfig } = require('../config/loadConfig');

function joinUrl(...parts) {
  return parts
    .map(p => p.replace(/^\/+|\/+$/g, ''))
    .join('/');
}

async function getSalesFromBackend(filters) {
  const config = await loadRemoteConfig();

  const baseUrl = config['api.vendas-flux-backend.url'];
  const basePath = config['api.vendas-flux-backend.base-path'];
  const version = config['api.vendas-flux-backend.version'];
  const dashboard = config['api.vendas-flux-backend.dashboard'];
  const listSales = config['api.vendas-flux-backend.list-Sales'];

  if (!baseUrl || !basePath || !version || !dashboard || !listSales) {
    throw new Error('❌ Configuração incompleta recebida do Config Server');
  }

  const fullUrl = `${baseUrl.replace(/\/+$/, '')}/${joinUrl(basePath, version, dashboard, listSales)}`;
  
  const response = await axios.get(fullUrl, {
    params: {
      status: filters.status,
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
  });

  return response.data;
}

module.exports = { getSalesFromBackend };
