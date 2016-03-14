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
        roundWH: {
            collection: 'roundWH',
            via: 'locationWH'
        },
        tournamentWH: {
            model: 'tournamentWH'
        }
    }
};

