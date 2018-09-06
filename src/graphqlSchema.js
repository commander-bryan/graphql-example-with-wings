import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import CommonSchema from './common/schema';
import CommonResolvers from './common/commonResolvers';

const schema = makeExecutableSchema({
    typeDefs: [
        CommonSchema,
    ],
    resolvers: merge({},
        CommonResolvers,
        { Query: { version: () => '1.0.0' } },
        { Mutation: { version: () => '1.0.0' } },
    ),
});

export default schema;
