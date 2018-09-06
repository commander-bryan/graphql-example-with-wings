import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';

import commonSchema from '../../common/schema';
import wingsSchema from './wings.graphqls';

function getTestSchema() {
    return makeExecutableSchema({
        typeDefs: [
            // Dependencies
            commonSchema,

            // Assessments specific
            wingsSchema,
        ],
        resolvers: {
            JSON: GraphQLJSON,
            WingsReview: {},
        },
    });
}

describe('Wings', () => {
    const query = `query {
       WingsReview(id: "review_1") {
            wings {
                sauce {
                    description
                    givenStars
                    totalStars
                }
                price {
                    description
                    givenStars
                    totalStars
                }
                quality {
                    description
                    givenStars
                    totalStars
                }
            }
            location {
                name
                description
                address
                district
            }
            __typename
        }
    }`;

    describe('Wings schema', () => {
        describe('Queries', () => {
            describe('WingsReview', () => {
                let response;

                beforeAll(async () => {
                    const testSchema = getTestSchema();
                    addMockFunctionsToSchema({
                        schema: testSchema,
                        mocks: {
                            JSON: () => (JSON.stringify({ foo: 'bar' })),
                            WingsReview: () => ({ __typename: 'WingsReview' }),
                        },
                        preserveResolvers: true,
                    });
                    response = await graphql(testSchema, query);
                });

                test('no errors returned', () => {
                    expect(response.errors).toBeUndefined();
                });

                describe('wings', () => {
                    test('is returned', () => {
                        expect(response.data.WingsReview.wings).toBeDefined();
                    });

                    test('sauce is returned', () => {
                        expect(response.data.WingsReview.wings.sauce).toBeDefined();
                    });

                    test('price is returned', () => {
                        expect(response.data.WingsReview.wings.price).toBeDefined();
                    });

                    test('quality is returned', () => {
                        expect(response.data.WingsReview.wings.quality).toBeDefined();
                    });

                    describe('sauce', () => {
                        // covers price and quality too, as they are both of type Rating
                        test('description is returned', () => {
                            expect(response.data.WingsReview.wings.sauce.description).toBeDefined();
                        });

                        test('givenStars is returned', () => {
                            expect(response.data.WingsReview.wings.sauce.givenStars).toBeDefined();
                        });

                        test('totalStars is returned', () => {
                            expect(response.data.WingsReview.wings.sauce.totalStars).toBeDefined();
                        });
                    });
                });

                describe('location', () => {
                    test('is returned', () => {
                        expect(response.data.WingsReview.location).toBeDefined();
                    });

                    test('nameis returned', () => {
                        expect(response.data.WingsReview.location.name).toBeDefined();
                    });

                    test('description is returned', () => {
                        expect(response.data.WingsReview.location.description).toBeDefined();
                    });

                    test('address is returned', () => {
                        expect(response.data.WingsReview.location.address).toBeDefined();
                    });

                    test('district is returned', () => {
                        expect(response.data.WingsReview.location.district).toBeDefined();
                    });
                });
            });
        });
    });
});
