const db = {
    WingsReview: {
        review_1: {
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
            wings: getWings(rawReview.wings),
            location: getLocation(rawReview.location),
        };
    };

    return {
        request,
        response,
        getReview,
    };
};

export default buildContext;
