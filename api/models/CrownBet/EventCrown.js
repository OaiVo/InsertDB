/**
 * Created by oaivo on 2/3/16.
 */
module.exports = {
    attributes: {
        eventId:{
            type:'string'
        },
        name:{
            type: 'string'
        },
        roundCrown:{
            collection: 'RoundCrown',
            via: 'eventCrown'
        },
        racerCrown:{
            collection: 'RacerCrown',
            via: 'eventCrown'
        },
        locationCrown: {
            model: 'locationCrown'
        }
    }
};
