const { startStandaloneServer } = require('@apollo/server/standalone')

const server = require('./server') 

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log('server is ready at', url)
})