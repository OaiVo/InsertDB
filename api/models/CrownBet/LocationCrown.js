/**
 * Created by oaivo on 2/3/16.
 */
module.exports = {
    attributes: {
        name:{
            type: 'string'
        },
        eventCrown: {
            collection: 'EventCrown',
            via: 'locationCrown'
        }
    }
};
