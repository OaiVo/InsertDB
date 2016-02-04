/**
 * Created by oaivo on 2/3/16.
 */
module.exports = {
    attributes: {
        name:{
            type: 'string'
        },
        day:{
            type: 'string'
        },
        subCategoryCrown: {
            collection: 'subCategoryCrown',
            via: 'tournamentCrown'
        }
    }
};
