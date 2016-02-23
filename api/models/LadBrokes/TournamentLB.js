module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        locationLB: {
            collection: 'locationLB',
            via: 'tournamentLB'
        }
    }
};