import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import graphqlSchema from './graphqlSchema';

import configuration from '../utils/configuration';
import buildContext from './context';

const app = express();
const graphqlEndpoint = '/graphql';

app.use(bodyParser.json());

if (configuration.enableCors) {
    app.use(cors({
        origin: configuration.clientWhitelist.split(',').map(url => url.trim()),
        credentials: true,
        methods: ['POST', 'OPTIONS'],
        allowedHeaders: 'Content-Type, ' +
            'Authorization, ' +
            'Content-Length, ' +
            'X-Requested-With, ',
        optionsSuccessStatus: 200,
    }));
}

app.use(graphqlEndpoint, bodyParser.json(), (request, response, next) => {
    // We wrap the graphqlExpress function in a normal middleware expression
    // so that context building errors are handled by our error handling stack
    const graphqlConfig = {
        schema: graphqlSchema,
        context: buildContext(request, response),
        rootValue: global,
        graphiql: true,
        formatError: error => ({
            message: error.message,
            details: error.originalError && error.originalError.details,
            locations: error.locations,
            path: error.path,
        }),
        tracing: true,
    };
    return graphqlExpress(graphqlConfig)(request, response, next);
});

app.get('/graphiql', graphiqlExpress({
    endpointURL: graphqlEndpoint,
}));

export default app;
