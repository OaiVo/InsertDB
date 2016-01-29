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
        day: {
            collection: 'day',
            via: 'tournament'
        },
        racing: {
            model: 'racing'
        }
    }
};
