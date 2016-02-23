module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        RoundLB: {
            collection: 'roundLB',
            via: 'locationLB'
        },
        tournamentLB: {
            model: 'tournamentLB'
        }
    }
};