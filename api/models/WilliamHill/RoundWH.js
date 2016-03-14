/**
 * Created by oaivo on 1/27/16.
 */
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        racerWH: {
            collection: 'racerWH',
            via: 'roundWH'
        },
        locationWH: {
            model: 'locationWH'
        }
    }
};
