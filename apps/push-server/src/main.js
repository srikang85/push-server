/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const express = require('express');
const messages = require('./app/routes/messages');
const router = express.Router();
const app = express();
const cors = require('cors');

// API Version for backward compatability.
const VERSION = '1.0';

app.use(cors());
messages(router, VERSION);
app.use(`/api`, router);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/${VERSION}`);
});
server.on('error', console.error);
