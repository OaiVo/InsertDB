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
        round: {
            collection: 'round',
            via: 'subCategory'
        },
        day: {
            model: 'day'
        }
    }
};

