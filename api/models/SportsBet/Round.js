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
        racer: {
            collection: 'racer',
            via: 'round'
        },
        location: {
            model: 'location'
        }
    }
};
