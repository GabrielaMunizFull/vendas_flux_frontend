const express = require('express');
const router = express.Router();

router.get('/env', (req, res) => {
  res.json({
    url: process.env.API_VENDAS_FLUX_BACKEND_URL,
    path: process.env.API_VENDAS_FLUX_BACKEND_DASHBOARD
  });
});

module.exports = router;
