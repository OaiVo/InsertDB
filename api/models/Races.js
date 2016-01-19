/**
 * Created by oaivo on 1/18/16.
 */
module.exports = {
    attributes: {
        data: {
            model: 'Data'
        },
        fields: {
            collection:'Fields',
            via: 'races'
        },
        horses: {
            collection:'Horses',
            via: 'races'
        },
        "Race_number": {
            type: 'string'
        },
        "Race_info": {
            type: 'string'
        },

        "Race_name": {
            type: 'string'
        }
    }
};
