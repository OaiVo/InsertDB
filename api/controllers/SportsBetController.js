/**
 * Created by oaivo on 1/22/16.
 */
var htmlToJson = require('html-to-json');
module.exports = {
    crawling: function (req, res) {
        var url = 'http://www.sportsbet.com.au/horse-racing/';
        var date = req.param('date');
        if (date == 'today') {
            var currentDate = new Date();
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var day = year + '-' + month + '-' + day;
        } else if (date == 'tomorrow') {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var day = year + '-' + month + '-' + day;
        } else {
            return res.badRequest('Invalid Date!!');
        }
        var getTournaments = SportsBetService.getTournaments(url);
        getTournaments.then(function (tournamentsData) {
            tournamentsData.forEach(function (tournament, i, tournaments) {
                var addTournament = SportsBetService.addTournament(tournament, day);
                addTournament.then(function (data) {
                    var getLocations = SportsBetService.getLocations(data.url, date);
                    getLocations.then(function (locationsData) {
                        if (locationsData.length > 0) {
                            locationsData.forEach(function (location, i2, locations) {
                                var addLocation = SportsBetService.addLocation(location, data.id);
                                addLocation.then(function (data2) {
                                    var getRounds = SportsBetService.getRounds(data2.url);
                                    getRounds.then(function (roundsData) {
                                        if (roundsData.length > 0) {
                                            roundsData.forEach(function (round, i3, rounds) {
                                                var addRound = SportsBetService.addRound(round, data2.id);
                                                addRound.then(function (data3) {
                                                    var getRacers = SportsBetService.getRacers(data3.url);
                                                    getRacers.then(function (racersData) {
                                                        if (racersData.length > 0) {
                                                            racersData.forEach(function (racer, i4, racers) {
                                                                var addRacer = SportsBetService.addRacer(racer, data3.id);
                                                                addRacer.then(function (data4) {
                                                                    sails.log('Done!!');
                                                                    return res.ok();
                                                                }, function (err) {
                                                                    sails.log(err);
                                                                });
                                                            });
                                                        }
                                                    }, function (err) {
                                                        sails.log(err);
                                                    });
                                                }, function (err) {
                                                    sails.log(err);
                                                });
                                            });
                                        }
                                    }, function (err) {

                                    });
                                }, function (err) {
                                    sails.log(err);
                                });
                            });
                        }
                    }, function (err) {
                        sails.log(err);
                    });
                }, function (err) {
                    sails.log(err);
                });
            });
        }, function (err) {
            sails.log(err);
            return res.badRequest(err);
        });
    },
    getData: function (req, res) {
        var date = req.param('date');
        if (date == 'today') {
            var currentDate = new Date();
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var day = year + '-' + month + '-' + day;
        }
        else if (date == 'tomorrow') {
            var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            var day = currentDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = currentDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = currentDate.getFullYear();
            var day = year + '-' + month + '-' + day;
        }
        else {
            return res.badRequest('Invalid Date!!');
        }
        var r = SportsBetService.getData1(day);
        r.then(function (data) {
            var max = data.length;
            var count = 0;
            if (max > 0) {
                data.forEach(function (tournament, i, tournaments) {
                    var max2 = tournament.location.length;
                    var count2 = 0;
                    if (max2 > 0) {
                        tournament.location.forEach(function (location, i2, locations) {
                            var r2 = SportsBetService.getData2(location.id);
                            r2.then(function (data2) {
                                location.rounds = data2;
                                count2++;
                                if (count2 == max2) {
                                    count++;
                                    if (count == max) {
                                        sails.log('Successfully!!');
                                        return res.ok(data);
                                    }
                                }
                            }, function (err) {
                                return res.badRequest('Do not get data');
                            });
                        });
                    } else {
                        count++;
                        if (count == max) {
                            sails.log('Successfully!!');
                            return res.ok(data);
                        }
                    }
                });
            } else {
                return res.ok({});
            }
        }, function (err) {
            return res.badRequest('Do not get data');
        });
    },
    test: function (req, res) {
        var date = req.param('date');
        var url = 'http://www.sportsbet.com.au/horse-racing/australia-nz?LeftNav';
        var getData = SportsBetService.getLocations(url, date);
        getData.then(function (data) {
            return res.ok(data);
        }, function (err) {
            sails.log(err);
            return res.badRequest(err);
        });
    }
};