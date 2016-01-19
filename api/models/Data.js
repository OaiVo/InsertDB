/**
 * Created by oaivo on 1/18/16.
 */
module.exports = {
    attributes: {
        races: {
            collection:'Races',
            via: 'data'
        },
        "Meeting_name":{
            type: 'string'
        },
        "Meeting_date":{
            type: 'string'
        },
        "Meeting_type":{
            type: 'string'
        },
        "Rail_position":{
            type: 'string'
        },
        "Track_condition":{
            type: 'string'
        },
        "Track_type":{
            type: 'string'
        },
        "Weather":{
            type: 'string'
        },
        "Penetrometer":{
            type: 'string'
        },
        "Track_information":{
            type: 'string'
        },
        "Final_fields_last_published":{
            type: 'string'
        },
        "Riders_must_be_declared_before":{
            type: 'string'
        },
        "Scratchings_closed":{
            type: 'string'
        }
    }
};

