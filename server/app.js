const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const http = require('http');
const websocket = require('ws');
const utils = require('./utils');
const cors = require('cors');
const wsport = 3006; // websocket port


const app = express();
const server = http.createServer(app);
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());


const websocketServer = new websocket.Server({ server });

server.listen(wsport, () => {
  debug(`websocket listening on port ${chalk.green(wsport)}`);
  console.log(`Websocket server started on port ${wsport}`);
});


// when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
  // send ack to the new client
  console.log(`Websocket connection ${'ok'}`);
  webSocketClient.send('{ "connection" : "ok"}');

  webSocketClient.on('message', (msg) => {
    console.log('incoming message:', msg);
    const m = JSON.parse(msg);
    console.log('msg: ', m);
    if (m.command === 'subscribe') {
      const interval = 1000; // milliseconds between each update
      console.log('subscribe interval ', interval);
      let tickData;
      const updates = setInterval(() => {
        try {
          tickData = utils.buildTickUpdate(m, tickData);
          webSocketClient.send(JSON.stringify(tickData));
        } catch (err) {
          console.log('err in set interval');
          clearInterval(updates);
        }
      }, interval);
    }
  });
});

