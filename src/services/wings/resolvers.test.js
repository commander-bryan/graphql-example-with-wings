import resolverMap from './resolvers';

describe('Wings Resolver Map', () => {
    let context;

    const mockWingsReview = {
        wings: {
            sauce: {
                description: 'shite',
                givenStars: 0,
                totalStars: 1000,
            },
            price: {
                description: 'expensive',
                givenStars: 0,
                totalStars: 1000,
            },
            quality: {
                description: 'shite cookin',
                givenStars: 0,
                totalStars: 1000,
            },
        },
        location: {
            name: 'graphql world',
            description: 'shitist pub ever',
            address: 'toms house',
            district: 'shitey balloch',
        },
    };
    const input = {
        wings: {
            sauce: {
                description: 'buffalo',
                givenStars: 2,
                totalStars: 10,
            },
            price: {
                description: '£7.50 for 10',
                givenStars: 5,
                totalStars: 10,
            },
            quality: {
                description: 'fried, crispy',
                givenStars: 4,
                totalStars: 10,
            },
        },
        location: {
            name: 'graphql world',
            description: 'shitist pub ever',
            address: 'toms house',
            district: 'shitey balloch',
        },
    };

    beforeEach(() => {
    });

    describe('Queries', () => {
        describe('WingsReview', () => {
            let actual;

            beforeEach(async () => {
                context = {
                    getReview: jest.fn(() => mockWingsReview),
                };
                actual = await resolverMap.Query.WingsReview(undefined, { id: 'review_1' }, context);
            });

            test('returns an object', () => {
                expect(actual).toBeDefined();
                expect(typeof actual).toEqual('object');
            });

            test('returns a WingsReview', () => {
                expect(actual.wings).toBeDefined();
                expect(actual.location).toBeDefined();
            });

            test('returns a Wings entry', () => {
                expect(actual.wings).toBeDefined();
                expect(actual.wings.sauce).toBeDefined();
                expect(actual.wings.price).toBeDefined();
                expect(actual.wings.quality).toBeDefined();
            });

            test('returns a Location entry', () => {
                expect(actual.location).toBeDefined();
                expect(actual.location.name).toBeDefined();
                expect(actual.location.address).toBeDefined();
                expect(actual.location.district).toBeDefined();
            });
        });
    });

    describe('Mutation', () => {
        describe('AddWingsReview', () => {
            let result;

            beforeEach(async () => {
                context = {
                    getReview: jest.fn(() => mockWingsReview),
                    addNewWingsReview: jest.fn(async () => 'newId'),
                };
                result = await resolverMap.Mutation.AddReview(null, { input }, context);
            });

            it('calls addNewWingsReview on the context', () => {
                expect(context.addNewWingsReview).toHaveBeenCalledWith(input);
            });

            it('gets the updated data', () => {
                expect(context.getReview).toHaveBeenCalledWith('newId');
            });

            it('returns the updated ClassAccess data', () => {
                expect(result).toEqual(mockWingsReview);
            });
        });
    });
});