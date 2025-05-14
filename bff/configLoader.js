const axios = require('axios');

async function loadConfig() {
  try {
    const response = await axios.get(
      "http://config-server-production.up.railway.app/vendas-flux-frontend/dev"
    );
    const propertySources = response.data.propertySources;

    const mergedProps = propertySources.reduce((acc, source) => {
      return { ...acc, ...source.source };
    }, {});

    // Mapeia as variáveis para o formato esperado pelo seu código
    for (const key in mergedProps) {
      const envKey = key
        .toUpperCase()
        .replace(/\./g, "_")  // Substitui '.' por '_'
        .replace(/-/g, "_");   // Substitui '-' por '_'
      process.env[envKey] = mergedProps[key];
    }

    console.log("[CONFIG] Configurações carregadas com sucesso do Config Server");
  } catch (err) {
    console.error("[CONFIG] Erro ao carregar configurações do Config Server:", err.message);
    process.exit(1);
  }
}

module.exports = loadConfig;
