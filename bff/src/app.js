const express = require('express');
const salesRoutes = require('./routes/sales');

const app = express();

app.use(express.json());
app.use('/api', salesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
