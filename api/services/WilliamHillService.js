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
        sails.log(2);
        var d = q.defer();
        var tournament = htmlToJson.request(url, {
            Tournaments: ['.block', {
                name: ['.drop-header a .left', function ($name) {
                    return $name.text();
                }],
                locations: ['.racing-location', {
                    name: ['>a', function ($name) {
                        return $name.text();
                    }],
                    url: ['>a', function ($url) {
                        return $url.attr('href');
                    }]
                }]
            }]
        }, function (err, data) {
            if (err) {
                d.reject('getTournaments has error');
            } else {
                d.resolve(data.Tournaments);
            }
        });
        return d.promise;
    },
    getRounds: function (url) {
        var d = q.defer();
        var tournament = htmlToJson.request(url, {
            Rounds: ['.table-hdr .races-row >ul>li', {
                name: ['>a', function ($name) {
                    return $name.text();
                }],
                url: ['>a', function ($url) {
                    return $url.attr('href');
                }]
            }]
        }, function (err, data) {
            if (err) {
                d.reject('getRounds has error');
            } else {
                d.resolve(data.Rounds);
            }
        });
        return d.promise;
    },
    getRacers: function (url) {
        var d = q.defer();
        var promise = htmlToJson.request(url, {
            racers: ['.bettingtable .competitor-view tr ', {
                name: ['.entrant-details>span:nth-child(1)', function ($name) {
                    return $name.text();
                }],
                number: ['.entrant-details>span:nth-child(2)', function ($name) {
                    return $name.text();
                }],
                barrier: ['.entrant-details>span:nth-child(3)', function ($name) {
                    var $content = $name.text().trim();
                    var $content2 = $content.split('(');
                    var $content3 = $content2[1].split(')');
                    return $content3[0].trim(')');
                }],
                win: ['.win', function ($val) {
                    return $val.text().trim();
                }],
                place: ['.place', function ($val) {
                    return $val.text().trim();
                }]
            }]
        }, function (err, data) {
            if (err) {
                d.reject('getHorses has error');
            } else {
                var newData=[];
                data.racers.forEach(function(racer,i,racers){
                    if(!(racer.number.length==0&&racer.name.length==0&&racer.barrier.length==0)){
                        newData.push(racer);
                    }
                });
                d.resolve(newData);
            }
        });
        return d.promise;
    },

    //add data


    addTournament: function (data,day) {
        var d = q.defer();
        TournamentLB.create({
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
        LocationLB.create({
            name: data.name[0],
            url: data.url[0],
            tournamentLB: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addLocation has error' + err)
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addRound: function (data, id) {
        var d = q.defer();
        RoundLB.create({
            name: data.name[0],
            url: data.url[0],
            locationLB: id
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
        RacerLB.create({
            name: data.name[0],
            number: data.number[0],
            barrier: data.barrier[0],
            win: data.win[0],
            place: data.place[0],
            roundLB: id
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
        TournamentLB.find({
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
        RoundLB.find({
            locationLB:id
        }).populate('racerLB').exec(function (err, obj) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    }
};
