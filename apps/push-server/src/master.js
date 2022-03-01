
const cluster = require('cluster');
const worker = require('./worker');
const cpus = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpus -2; i++) {
        cluster.fork();
    }
    cluster.on('exit', (slave, code, signal) => {
        console.error(`Worker ${slave.process.pid} exited`);
        console.log('Creating new worked');
        cluster.fork();
    });
} else {
  console.log(`Starting worker ${process.pid}`);
  worker();
}
