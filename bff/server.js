// server.js
const app = require('./app'); // Importa a aplicação configurada no app.js
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
