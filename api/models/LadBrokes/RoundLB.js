module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        RacerLB: {
            collection: 'racerLB',
            via: 'roundLB'
        },
        locationLB: {
            model: 'locationLB'
        }
    }
};