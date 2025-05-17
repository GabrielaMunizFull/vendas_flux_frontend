const express = require('express');
const router = express.Router();
const { getSalesFromBackend } = require('../services/vendas-flux.service');

router.get('/sales', async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    };

    const data = await getSalesFromBackend(filters);
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

module.exports = router;
