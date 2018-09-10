const resolverMap = {
    Query: {
        WingsReview: async (_, { id }, context) => context.getReview(id),
        WingsReviews: async (_, { id }, context) => context.getReviews(),
    },
    Mutation: {
        AddReview: async (_, { input }, context) => context.addNewWingsReview(input).then(
            id => context.getReview(id),
        ),
        ModifyReview: async (_, { input }, context) => context.modifyWingsReview(input),
    },
};

export default resolverMap;
