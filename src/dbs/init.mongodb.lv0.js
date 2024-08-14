'use strict'

const mongoose = require('mongoose');

const connectString = 'mongodb://localhost:27017/shopDev';

mongoose.connect(connectString).then(_ => console.log('Connect MongoDb Successfully')).catch(err => console.log('Error occured!'));

// dev 
if (1 === 1) {
  mongoose.set('debug', true);
  mongoose.set('debug', { color: true });
}

module.exports = mongoose;
