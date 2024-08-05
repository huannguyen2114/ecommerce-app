const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get('/', (req, res, next) => {
  const srcCompress = 'Hello world';

  return res.status(200).json({
    message: 'welcome'
  })
})

module.exports(express);
