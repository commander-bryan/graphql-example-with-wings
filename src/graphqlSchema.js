import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';

import CommonSchema from './common/schema';
import CommonResolvers from './common/commonResolvers';

import WingsSchema from './services/wings/wings.graphqls';
import WingsResolvers from './services/wings/resolvers';

const schema = makeExecutableSchema({
    typeDefs: [
        CommonSchema,
        WingsSchema,
    ],
    resolvers: merge({},
        CommonResolvers,
        WingsResolvers,
        { Query: { version: () => '1.0.0' } },
        { Mutation: { version: () => '1.0.0' } },
    ),
});

export default schema;
