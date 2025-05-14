// app.js
const express = require('express');
const loadConfig = require('./configLoader.js'); // Carrega a configuração
const listSalesService = require('./src/services/listSales.service.js'); // Importa o serviço de vendas
const cors = require('cors');
const app = express();

// Carregar as configurações antes de qualquer outra coisa
loadConfig().then(() => {
  app.use(cors()); // Permite conexões de qualquer origem
  app.use(express.json()); // Interpreta JSON na requisição

  // Definindo a rota para obter os dados de vendas
  app.get('/api/vendas', async (req, res) => {
    try {
      // Chama o serviço que faz a requisição para a API
      const listSalesData = await listSalesService.getListSalesData();
      res.json(listSalesData); // Retorna os dados para o cliente
    } catch (error) {
      console.error("Erro ao obter dados de vendas:", error);
      res.status(500).send("Erro ao acessar os dados de vendas");
    }
  });

  console.log('[API] Configuração completa do servidor.');
}).catch((err) => {
  console.error("[CONFIG] Não foi possível carregar a configuração.");
  process.exit(1);
});

module.exports = app; // Exporta a aplicação Express para ser usada no server.js
