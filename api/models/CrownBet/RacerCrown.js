/**
 * Created by oaivo on 2/3/16.
 */
module.exports = {
    attributes: {
        racerId:{
          type: 'integer'
        },
        name:{
            type: 'string'
        },
        racer: {
            collection: 'RacerCrown',
            via: 'locationCrown'
        },
        locationCrown: {
            model:'locationCrown'
        }
    }
};
