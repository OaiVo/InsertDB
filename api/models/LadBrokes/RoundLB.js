module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        racerLB: {
            collection: 'racerLB',
            via: 'roundLB'
        },
        locationLB: {
            model: 'locationLB'
        }
    }
};