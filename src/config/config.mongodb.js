import process from 'process';

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_PORT || 'shopDEV',
  }
}


const product = {
  app: {
    port: process.env.PRO_APP_PORT || 3030
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_PORT || 'shopPRO',
  }
}

const config = { dev, product };
const env = process.env.NODE_ENV || 'dev';
export default config[env];
