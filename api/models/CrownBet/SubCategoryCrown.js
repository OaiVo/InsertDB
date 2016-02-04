/**
 * Created by oaivo on 2/4/16.
 */
module.exports = {
    attributes: {
        subCategoryId:{
            type: 'string'
        },
        name: {
            type: 'string'
        },
        slug:{
            type: 'string'
        },
        roundCrown: {
            collection: 'roundCrown',
            via: 'subCategoryCrown'
        },
        tournamentCrown: {
            model: 'tournamentCrown'
        }
    }
};
