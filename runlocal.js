const nodemon = require('nodemon');
const dotenv = require('dotenv');

dotenv.config();
console.log('NOTE: .env file in use');
console.log('-----------');
console.log(`NODE_ENV set to: ${process.env.NODE_ENV}`);
console.log('-----------');

// NOTE: For other nodemon configuration see `nodemon.json`.

nodemon('src/server.js --exec babel-node')
    .on('start', () => console.log('Starting graphql-example-with-wings at localhost:5050/graphql'))
    .on('quit', () => process.exit(0))
    .on('restart', files => files ?
        console.log('GraphQL restarted due to', files[0]) :
        console.log('GraphQL restarted'))
    .on('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'))
    .on('crash', () => console.log('Nodemon (the stuff that restarts the server) has crashed o_O'));
