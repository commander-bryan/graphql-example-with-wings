import uuid from 'uuid';

const db = {
    WingsReview: {
        review_1: {
            id: 'review_1',
            wings: 'wings_1',
            location: 'location_1',
        },
    },
    Wings: {
        wings_1: {
            sauce: 'rating_1',
            price: 'rating_2',
            quality: 'rating_3',

        },
    },
    Rating: {
        rating_1: {
            description: 'bbq sauce',
            givenStars: 10,
            totalStars: 10,
        },
        rating_2: {
            description: '£5 for 8',
            givenStars: 6,
            totalStars: 10,
        },
        rating_3: {
            description: 'well cooked',
            givenStars: 10,
            totalStars: 10,
        },
    },
    Location: {
        location_1: {
            name: 'Lebowskies',
            address: 'Argyle St',
            district: 'Finnaeston',
        },
    },

};

const buildContext = (request, response) => {
    const getLocation = id => db.Location[id];
    const getRating = id => db.Rating[id];

    const getWings = (id) => {
        const rawWings = db.Wings[id];
        return {
            sauce: getRating(rawWings.sauce),
            price: getRating(rawWings.price),
            quality: getRating(rawWings.quality),
        };
    };

    const getReview = (id) => {
        const rawReview = db.WingsReview[id];
        return {
            id: rawReview.id,
            wings: getWings(rawReview.wings),
            location: getLocation(rawReview.location),
        };
    };

    const getReviews = () => {
        const rawReviewIds = Object.keys(db.WingsReview);
        const rawReviews = rawReviewIds.map(id => ({
            id,
            wings: getWings(db.WingsReview[id].wings),
            location: getLocation(db.WingsReview[id].location),
        }));
        return rawReviews;
    };

    const addLocation = (location) => {
        const id = uuid();
        db.Location[id] = location;
        return id;
    };

    const addRating = (rating) => {
        const id = uuid();
        db.Rating[id] = rating;
        return id;
    };

    const addWings = (wings) => {
        const id = uuid();
        const newWings = {
            sauce: addRating(wings.sauce),
            price: addRating(wings.price),
            quality: addRating(wings.quality),
        };
        db.Wings[id] = newWings;
        return id;
    };

    const addNewWingsReview = async (wingsReview) => {
        const id = uuid();
        const newWingsReview = {
            id,
            wings: addWings(wingsReview.wings),
            location: addLocation(wingsReview.location),
        };
        db.WingsReview[id] = newWingsReview;
        return id;
    };

    return {
        request,
        response,
        getReview,
        getReviews,
        addNewWingsReview,
    };
};

export default buildContext;
