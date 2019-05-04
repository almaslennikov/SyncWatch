const express = require('express');
const {Server} = require('http');
const app = express();
const http = Server(app);
const WebSocket = require('ws');


const log = require('./logger');

const port = 7777;

runServer(port);
const wss = new WebSocket.Server({ server: http });

wss.on('connection', (ws, req) => {
    console.log(`Connected socket: ${req.connection.remoteAddress}`);

    ws.on('message', data => {
        log.info(`Received: ${data}`);
        wss.clients.forEach(function each(client) {
            log.info(`Client: ${client.readyState}`);
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    })
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


function runServer(port) {
    http.listen(port, '0.0.0.0', () => log.info(`Listening port ${port}`));
}
