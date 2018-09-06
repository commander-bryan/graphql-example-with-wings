const GraphQLJSON = require('graphql-type-json');
const { GraphQLDateTime } = require('graphql-iso-date');

const CommonResolvers = {
    JSON: GraphQLJSON,
    Date: GraphQLDateTime,
};

export default CommonResolvers;
