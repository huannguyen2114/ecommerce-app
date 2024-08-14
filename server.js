import app from "./src/app.js";
import process from 'process';

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => {
  console.log(`Web server is successfully run on ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);

  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // Adjust timeout as needed
};


process.on("SIGINT", gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  gracefulShutdown();
});

