const resolverMap = {
    Query: {
        WingsReview: async (_, { id }, context) => context.getReview(id),
    },
    Mutation: {
        AddReview: async (_, { input }, context) => context.addNewWingsReview(input).then(
                id => context.getReview(id),
            ),
    },
};

export default resolverMap;
