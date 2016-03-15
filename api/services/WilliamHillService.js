/**
 * Created by oaivo on 2/22/16.
 */
/**
 * Created by oaivo on 1/22/16.
 */
var q = require('q');
var htmlToJson = require('html-to-json');

module.exports = {
    getTournaments: function (url) {
        var d = q.defer();
        var tournament = htmlToJson.request(url, {
            Tournaments: ['.block', {
                name: ['>.drop-header .left', function ($name) {
                    var $content = $name.text().trim();
                    var $content2 = $content.split('(');
                    return $content2[0].trim();
                }],
                locations: ['>.block-grid tbody>tr', {
                    name: ['.venue', function ($name) {
                        return $name.text().trim();
                    }],
                    url: ['.fixed a', function ($url) {
                        return $url.attr('href');
                    }]
                }]
            }]
        }, function (err, data) {
            if (err) {
                d.reject('getTournaments has error');
            } else {
                data.Tournaments.splice(0, 1);
                d.resolve(data.Tournaments);
            }
        });
        return d.promise;
    },
    getRacers: function (url) {
        var d = q.defer();
        var promise = htmlToJson.request(url, {
            racers: ['.win-place .row:not(.race-details):not(.race-legend):not(.s-frm):not(.extra-bet-check-container)', {
                name: ['.competitorName', function ($name) {
                    return $name.text().trim();
                }],
                number: ['.number b', function ($number) {
                    return $number.text().trim();
                }],
                barrier: ['.number text', function ($barrier) {
                    var $content = $barrier.text().trim();
                    var $content2 = $content.split('(');
                    if($content2[1]) {
                        var $content3 = $content2[1].split(')');
                        return $content3[0].trim();
                    }else{
                        return null;
                    }
                }],
                win: ['.btote-win', function ($val) {
                    return $val.text().trim();
                }],
                place: ['.btote-place', function ($val) {
                    return $val.text().trim();
                }]
            }]
        }, function (err, data) {
            if (err) {
                sails.log(err);
                d.reject('getRacers has error');
            } else {
                d.resolve(data.racers);
            }
        });
        return d.promise;
    },

    //add data


    addTournament: function (data,day) {
        var d = q.defer();
        TournamentWH.create({
            name: data,
            date: day
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addTournament has error' + err)
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addLocation: function (data, id) {
        var d = q.defer();
        LocationWH.create({
            name: data.name[0],
            url: data.url[0],
            tournamentWH: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addLocation has error' + err)
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addRound: function (round,url, id) {
        var d = q.defer();
        RoundWH.create({
            name: 'R'+round,
            url: 'https://www.williamhill.com.au/'+url,
            locationWH: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addRound has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addRacer: function (data, id) {
        var d = q.defer();
        RacerWH.create({
            name: data.name[0],
            number: data.number[0],
            barrier: data.barrier[0],
            win: data.win[0],
            place: data.place[0],
            roundWH: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addRacer has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    getData1: function(day){
        var d = q.defer();
        TournamentWH.find({
            date:day
        }).populateAll().exec(function (err, obj) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    getData2: function(id){
        var d = q.defer();
        RoundWH.find({
            locationWH:id
        }).populate('racerWH').exec(function (err, obj) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    }
};
