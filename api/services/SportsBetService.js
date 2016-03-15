/**
 * Created by oaivo on 1/22/16.
 */
var q = require('q');
var htmlToJson = require('html-to-json');

module.exports = {

    getTournaments: function (url) {
        var d = q.defer();
        var newData =
            [
                {
                    name: ['Australia - NZ'],
                    href: ['http://www.sportsbet.com.au/horse-racing/australia-nz?LeftNav']
                },
                {
                    name: ['International'],
                    href: ['http://www.sportsbet.com.au/horse-racing/international?LeftNav']
                },
                {
                    name: ['Asia Racing'],
                    href: ['http://www.sportsbet.com.au/horse-racing/asia-racing?LeftNav']
                },
                {
                    name: ['American'],
                    href: ['http://www.sportsbet.com.au/horse-racing/american?LeftNav']
                }
            ];
        d.resolve(newData);
        return d.promise;

        // get tournaments.
        if (url) {
            var horsesRacing = htmlToJson.request(url, {
                tournaments: ['.nav-racing>ul>li>ul>li', {
                    name: ['.nav-racing>ul>li>ul>li>a', function ($name) {
                        return $name.text();
                    }],
                    href: ['.nav-racing>ul>li>ul>li>a', function ($name) {
                        return $name.attr('href');
                    }]
                }]
            }, function (err, data) {
                if (err) {
                    d.reject('getTournaments error');
                } else {
                    d.resolve(data.tournaments);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    getLocations: function (url,date) {
        var d = q.defer();
        if (url) {
            var promise = htmlToJson.request(url, {
                days: ['.nav-racing>ul>li>ul>li>ul>li', {
                    name: ['.nav-racing>ul>li>ul>li>ul>li>a', function ($name) {
                        return $name.text();
                    }],
                    locations: ['.nav-racing>ul>li>ul>li>ul>li>ul>li', {
                        name: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>a', function ($name) {
                            return $name.text();
                        }],
                        href: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>a', function ($href) {
                            return $href.attr('href');
                        }]
                    }]
                }]
            }, function (err, data) {
                if (err) {
                    d.reject('getLocations has error');
                } else {
                    var result=[];
                    data.days.forEach(function(day,i,days){
                        if(day.name[0].toLowerCase()==date){
                            result.push(day.locations);
                        }
                    });
                    d.resolve(result[0]);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    getRounds: function (url) {
        var d = q.defer();
        if (url) {
            var promise = htmlToJson.request(url, {
                rounds: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li', {
                    name: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li>a', function ($name) {
                        var content = $name.text();
                        var res = content.split('-');
                        return res[0].trim();
                    }],
                    startTime: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li>a', function ($name) {
                        var content = $name.text();
                        var res = content.split('-');
                        return res[1].trim();
                    }],
                    href: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li>a', function ($href) {
                        return $href.attr('href');
                    }]
                }]
            }, function (err, data) {
                if (err) {
                    d.reject('getSubcategory has error');
                } else {
                    d.resolve(data.rounds);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    getRacers: function (url) {
        var d = q.defer();
        if (url) {
            var promise = htmlToJson.request(url, {
                racers: ['.racing-bettype-row', {
                    name: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content = $name.text().trim();
                        var $content2 = $content.split('.');
                        if($content2[1]) {
                            var $content3 = $content2[1].split('(');
                            return $content3[0].trim();
                        }else{
                            return null;
                        }
                    }],
                    number: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content = $name.text().trim();
                        var $content2 = $content.split('.');
                        return $content2[0].trim();
                    }],
                    barrier: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content = $name.text().trim();
                        var $content2 = $content.split('(');
                        if($content2[1]) {
                            var $content3 = $content2[1].split(')');
                            return $content3[0].trim(')');
                        }else{
                            return null;
                        }
                    }],
                    win: ['.racing-bettype-row>.vis-row>.float-right>.dflt_win_price>a>span', function ($val) {
                        return $val.text().trim();
                    }],
                    place: ['.racing-bettype-row>.vis-row>.float-right>li:nth-child(2)>a>span', function ($val) {
                        //not(.dflt_win_price):not(.subtab-WO)
                        return $val.text().trim();
                    }]
                }]
            }, function (err, data) {
                if (err) {
                    d.reject('getHorses has error');
                } else {
                    d.resolve(data.racers);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    addTournament: function (data, date) {
        var d = q.defer();
        Tournament.create({
            name: data.name[0],
            url: data.href[0],
            date: date
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
        Location.create({
            name: data.name[0],
            url: data.href[0],
            tournament: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addDay has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addRound: function (data, id) {
        var d = q.defer();
        Round.create({
            name: data.name[0],
            url: data.href[0],
            location: id
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
        Racer.create({
            name: data.name[0],
            number: data.number[0],
            barrier: data.barrier[0],
            win: data.win[0],
            place: data.place[0],
            round: id
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
        Tournament.find({
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
        Round.find({
            location:id
        }).populate('racer').exec(function (err, obj) {
            if (err) {
                sails.log(111);
                d.reject(err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    }
};