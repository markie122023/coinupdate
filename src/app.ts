import { updateCoin, updateNairaRates } from "./services/updateCoins";


 setInterval(updateNairaRates,1000 * 60  * 10);
 setInterval(updateCoin,1000 * 60 * 10);
 const fastify = require('fastify')();

// Define a route
fastify.get('/', (request, reply) => {
  reply.send({ message: 'Hello, Fastify!' });
});

// Start the server
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

 