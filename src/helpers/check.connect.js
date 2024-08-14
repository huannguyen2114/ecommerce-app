import mongoose from 'mongoose';
import os from 'os';
import process from 'process';

const _SECONDS = 5000

const countConnect = () => {
  const numConnection = mongoose.connection.length;
  console.log(`Number of connection::${numConnection}`);
}

// Check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connection.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Maximum number of connection based on number of cores
    const maxConnection = numCores * 5;

    console.log(`Active connection:: ${numConnection}`)
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnection) {
      console.log('Connection overload');
    }

  }, _SECONDS)
}

export { countConnect, checkOverload };
