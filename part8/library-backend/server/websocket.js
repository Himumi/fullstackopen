const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/use/ws');

const { httpServer } = require('./express');
const schema = require('./schema');

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});

const serverCleanup = useServer({ schema }, wsServer);

module.exports = serverCleanup;
