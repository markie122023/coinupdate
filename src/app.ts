import { updateCoin, updateNairaRates } from "./services/updateCoins";


 setInterval(updateNairaRates,1000 * 60  * 10);
 setInterval(updateCoin,1000 * 60 * 10);
 const fastify = require('fastify')();

// Define a route
fastify.get('/', (request, reply) => {
  reply.send({ message: 'Hello, Fastify!' });
});

// Start the server
// Set the port to 0, which tells the operating system to choose an available port.
fastify.listen(0, '127.0.0.1', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on port ${address.port}`);
  });

 