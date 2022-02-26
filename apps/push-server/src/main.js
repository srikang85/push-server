/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const express = require('express');
const messages = require('./app/routes/messages');
const secrets = require('./app/routes/secrets');
const uuids = require('./app/routes/uuid');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
import { SecretService } from './app/serices/secretService';

// API Version for backward compatability.
const VERSION = '1.0';

app.use(cors());
app.use(bodyParser.json());
messages(router, VERSION);
secrets(router, VERSION);
uuids(router, VERSION);

app.use(`/api`, router);

const port = process.env.port || 3333;

SecretService.loadSecret();

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/${VERSION}`);
});
server.on('error', console.error);
