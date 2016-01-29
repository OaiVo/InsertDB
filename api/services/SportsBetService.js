/**
 * Created by oaivo on 1/22/16.
 */
var q = require('q');
var htmlToJson = require('html-to-json');

module.exports = {
    getRacing: function (url) {
        var d = q.defer();
        if (url) {
            var horsesRacing = htmlToJson.request(url, {
                RacingType: ['.nav-racing>ul>li', {
                    name: ['.nav-racing>ul>li>a', function ($name) {
                        return $name.text();
                    }],
                    tournaments: ['.nav-racing>ul>li>ul>li', {
                        name: ['.nav-racing>ul>li>ul>li>a', function ($name) {
                            return $name.text();
                        }],
                        href: ['.nav-racing>ul>li>ul>li>a', function ($name) {
                            return $name.attr('href');
                        }]
                    }]
                }]
            }, function (err, data) {
                if (err) {
                    d.reject('getRacing error');
                } else {
                    d.resolve(data.RacingType);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    getDays: function (url) {
        var d = q.defer();
        if (url) {
            var promise = htmlToJson.request(url, {
                days: ['.nav-racing>ul>li>ul>li>ul>li', {
                    name: ['.nav-racing>ul>li>ul>li>ul>li>a', function ($name) {
                        return $name.text();
                    }],
                    subCategories: ['.nav-racing>ul>li>ul>li>ul>li>ul>li', {
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
                    d.reject('getDays has error');
                } else {
                    d.resolve(data.days);
                }
            });
        } else {
            var data = [];
            d.resolve(data);
        }
        return d.promise;
    },
    getSubCategory: function (url) {
        var d = q.defer();
        if (url) {
            var promise = htmlToJson.request(url, {
                rounds: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li', {
                    number: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li>a', function ($name) {
                        var content = $name.text();
                        var res = content.split('-');
                        return res[0].trim();
                    }],
                    startTime: ['.nav-racing>ul>li>ul>li>ul>li>ul>li>ul>li>a', function ($name) {
                        var content = $name.text();
                        var res = content.split('-');
                        return res[1][2].trim();
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
        sails.log(url);
        if (url) {
            var promise = htmlToJson.request(url, {
                racers: ['.racing-bettype-row', {
                    name: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content=$name.text().trim();
                        var $content2=$content.split('.');
                        var $content3=$content2[1].split('(');
                        return $content3[0].trim();
                    }],
                    number: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content=$name.text().trim();
                        var $content2=$content.split('.');
                        return $content2[0].trim();
                    }],
                    barrier: ['.racing-bettype-row>.vis-row>.racer-form>.racer-details>.racer-name', function ($name) {
                        var $content=$name.text().trim();
                        var $content2=$content.split('(');
                        var $content3=$content2[1].split(')');
                        return $content3[0].trim(')');
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
    addRacing: function (data) {
        var d = q.defer();
        Racing.create({
            name: data
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addRacing has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addTournament: function (data, id) {
        var d = q.defer();
        Tournament.create({
            name: data.name,
            url: data.href,
            racing: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addTournament has error' + err)
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addDay: function (data, id) {
        var d = q.defer();
        Day.create({
            name: data.name,
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
    addSubCategory: function (data, id) {
        var d = q.defer();
        SubCategory.create({
            name: data.name,
            url: data.href,
            day: id
        }).exec(function (err, obj) {
            if (err) {
                d.reject('addSubcategory has error' + err);
            } else {
                d.resolve(obj);
            }
        });
        return d.promise;
    },
    addRound: function (data, id) {
        var d = q.defer();
        Round.create({
            number: data.number[0],
            startTime: data.startTime[0],
            url: data.href[0],
            subCategory: id
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
        sails.log(1);
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
    }
};