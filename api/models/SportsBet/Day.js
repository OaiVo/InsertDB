/**
 * Created by oaivo on 1/27/16.
 */
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        subCategory: {
            collection: 'subCategory',
            via:'day'
        },
        tournament: {
            model: 'tournament'
        }
    }
};
