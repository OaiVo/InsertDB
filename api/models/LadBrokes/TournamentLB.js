module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        date: {
            type: 'string'
        },
        locationLB: {
            collection: 'locationLB',
            via: 'tournamentLB'
        }
    }
};