/**
 * Created by oaivo on 1/18/16.
 */
module.exports = {
    attributes: {
        races: {
            model: 'Races'
        },
        forms: {
            collection:'Forms',
            via: 'horses'
        },
        "Silks": {
            type: 'string'
        },
        "Horse_number": {
            type: 'string'
        },
        "Horse_name": {
            type: 'string'
        },
        "Plain": {
            type: 'string'
        },
        "Info": {
            type: 'string'
        }
    }
};
