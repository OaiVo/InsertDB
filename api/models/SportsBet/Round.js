/**
 * Created by oaivo on 1/27/16.
 */
module.exports = {
    attributes: {
        number: {
            type: 'string'
        },
        startTime:{
            type: 'string'
        },
        url: {
            type: 'string'
        },
        racer: {
            collection: 'racer',
            via: 'round'
        },
        subCategory: {
            model: 'subCategory'
        }
    }
};
