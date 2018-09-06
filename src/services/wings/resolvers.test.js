import resolverMap from './resolvers';
import context from '../../context';

describe('Wings Resolver Map', () => {
    beforeEach(() => {
    });

    describe('Queries', () => {
        describe('WingsReview', () => {
            let actual;

            beforeEach(async () => {
                actual = await resolverMap.Query.WingsReview(undefined, { id: 'review_1' }, context());
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
});
