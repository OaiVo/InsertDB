/**
 * Created by oaivo on 1/27/16.
 */
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        date: {
            type: 'string'
        },
        location: {
            collection: 'location',
            via: 'tournament'
        }
    }
};
