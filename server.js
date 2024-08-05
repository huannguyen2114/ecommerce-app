const app = require('./src/app.js');

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Web server is successfully run on ${PORT}`);
})

process.on('SIGINT', () => {
  server.close(() => console.log('Exit Express App'));
})
