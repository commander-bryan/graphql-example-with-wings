const resolverMap = {
    Query: {
        WingsReview: async (_, { id }, context) => context.getReview(id),
    },
    Mutation: {},
};

export default resolverMap;
