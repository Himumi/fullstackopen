const apolloServer = require('./server/apollo');
const mongoServer = require('./server/mongo');

const { httpServer } = require('./server/express');

mongoServer();
apolloServer();

const PORT = 4000;
httpServer.listen(PORT, () =>
  console.log(`Server is now running at http://localhost:${PORT}`),
);
