const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');

const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const { app, express, httpServer } = require('./express');

const context = require('./context');
const schema = require('./schema');

const serverCleanup = require('./websocket');

const apollo = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const apolloServer = async () => {
  await apollo.start();

  // Middlewares
  app.use('/', cors(), express.json(), expressMiddleware(apollo, { context }));
};

module.exports = apolloServer;
