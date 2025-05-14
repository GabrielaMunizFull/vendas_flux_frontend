const axios = require('axios');

exports.getListSalesData = async () => {
  const baseUrl = process.env.API_VENDAS_FLUX_BACKEND_URL;
  const basePath = process.env.API_VENDAS_FLUX_BACKEND_BASE_PATH;
  const version = process.env.API_VENDAS_FLUX_BACKEND_VERSION;
  const dashboardPath = process.env.API_VENDAS_FLUX_BACKEND_DASHBOARD;
  const listSalesPath = process.env.API_VENDAS_FLUX_BACKEND_LIST_SALES;

  console.log('baseUrl:', baseUrl);
  console.log('basePath:', basePath);
  console.log('version:', version);
  console.log('dashboardPath:', dashboardPath);
  console.log('listSalesPath:', listSalesPath);

  const fullUrl = `${baseUrl}${basePath}${version}${dashboardPath}${listSalesPath}`;
  console.log(`[API] URL completa para listagem de vendas: ${fullUrl}`);

  const response = await axios.get(fullUrl);
  return response.data;
};
