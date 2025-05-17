const { loadRemoteConfig } = require('./loadConfig');

let cachedConfig = null;

async function getConfig() {
  if (!cachedConfig) {
    cachedConfig = await loadRemoteConfig();
  }
  return cachedConfig;
}

module.exports = { getConfig };
