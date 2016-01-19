/**
 * Created by oaivo on 1/19/16.
 */
var q = require('q');

module.exports = {
    addData: function (data) {
        var d = q.defer();
        Data.create({
            Meeting_name: data.Meeting_name,
            Meeting_date: data.Meeting_date,
            Meeting_type: data.Meeting_type,
            Rail_position: data.Rail_position,
            Track_condition: data.Track_condition,
            Track_type: data.Track_type,
            Weather: data.Weather,
            Penetrometer: data.Penetrometer,
            Track_information: data.Track_information,
            Final_fields_last_published: data.Final_fields_last_published,
            Riders_must_be_declared_before: data.Riders_must_be_declared_before,
            Scratchings_closed: data.Scratchings_closed
        }).exec(function (err, obj1) {
            if (err) {
                d.reject('Data has error');
            } else {
                try {
                    data.races.forEach(function (race, index, array) {
                        Races.create({
                            data: obj1.id,
                            Race_number: race.Race_number,
                            Race_info: race.Race_info,
                            Race_name: race.Race_info
                        }).exec(function (err, obj2) {
                            if (err) {
                                d.reject(err);
                            } else {
                                try {
                                    race.fields.forEach(function (field, index, array) {
                                        Fields.create({
                                            races: obj2.id,
                                            Number: field.Number,
                                            Lastform: field.Lastform,
                                            Horse: field.Horse,
                                            Trainer: field.Trainer,
                                            Jockey: field.Jockey,
                                            Barrier: field.Barrier,
                                            Weight: field.Weight,
                                            Penalty: field.Penalty,
                                            Hcp: field.Hcp,
                                            Scratched: field.Scratched
                                        }).exec(function (err, obj3) {
                                            if (err) {
                                                d.reject(err);
                                            } else {
                                                d.resolve();
                                                ///////////////////////
                                                ///////////////////////
                                            }
                                        });
                                    });
                                }catch(e){
                                    d.reject('fields-Data has error');
                                }
                                try {
                                    race.horses.forEach(function (horse, index, array) {
                                        Horses.create({
                                            races: obj2.id,
                                            Silks: horse.Silks,
                                            Horse_number: horse.Horse_number,
                                            Horse_name: horse.Horse_name,
                                            Plain: horse.Plain,
                                            Info: horse.Info
                                        }).exec(function (err, obj3) {
                                            if (err) {
                                                d.reject(err);
                                            } else {
                                                try {
                                                    horse.forms.forEach(function (form, index, array) {
                                                        Forms.create({
                                                            horses: obj3.id,
                                                            Final_position: form.Silks,
                                                            Field_size: form.Horse_number,
                                                            RemainText: form.Plain
                                                        }).exec(function (err, obj4) {
                                                            if (err) {
                                                                d.reject(err);
                                                            } else {
                                                                d.resolve();
                                                            }
                                                        });
                                                    });
                                                }catch(e){
                                                    d.reject('forms-data has error')
                                                }
                                            }
                                        });
                                    });
                                }catch(e){
                                    d.reject('horses-data has error');
                                }
                            }
                        });
                    });
                }catch(e){
                    d.reject('races-data has error');
                }
            }
        });
        return d.promise;
    },
    getAllData: function () {
        var d = q.defer();
        Data.find().populateAll().exec(function (err, obj) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    }
};