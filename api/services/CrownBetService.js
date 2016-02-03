/**
 * Created by oaivo on 2/3/16.
 */
var q = require('q');

module.exports = {
    addLocation: function (name) {
        var d = q.defer();
        LocationCrown.create({
            name: name
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addLocation has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addEvent: function (data,id) {
        var d = q.defer();
        EventCrown.create({
            eventId: data.MasterEventID,
            name: data.Venue.Venue,
            locationCrown: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addEvent has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    }
};
