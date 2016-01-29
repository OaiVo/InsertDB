/**
 * Created by oaivo on 1/22/16.
 */
var htmlToJson = require('html-to-json');
module.exports = {
    crawling: function (req, res) {
        /*var url = req.param('url');
         if (url == undefined || url == '') {
         return res.badRequest('Url not found');
         }
         if (url.trim().startsWith('http://www.sportsbet.com.au/')) {
         } else {
         return res.badRequest('Domain wrong');
         }*/
        var finalData = {
            status: true,
            data: {}
        };
        var url = 'http://www.sportsbet.com.au/horse-racing/';
        var that=this;

        var Racing = SportsBetService.getRacing(url);
        Racing.then(function (racingData) {
            var data = racingData[2];
            var count = 0;
            var max = data.tournaments.length;
            sails.log('-----max--------' + max);
            data.tournaments.forEach(function (tournament, index, tournaments) {
                var result = SportsBetService.getDays(tournament.href[0]);
                result.then(function (r) {
                    var max1 = r.length;
                    if (max1 > 0) {
                        var count1 = 0;
                        r.forEach(function (day, index2, days) {
                            var max2 = day.subCategories.length;
                            if (max2 > 0) {
                                var count2 = 0;
                                day.subCategories.forEach(function (subCategory, index3, subCategories) {
                                    var result2 = SportsBetService.getSubCategory(subCategory.href[0]);
                                    result2.then(function (r2) {
                                        var max3 = r2.length;
                                        if (max3 > 0) {
                                            var count3 = 0;
                                            r2.forEach(function (round, index3, rounds) {
                                                var result3 = SportsBetService.getRacers(round.href[0]);
                                                result3.then(function (r3) {
                                                    count3++;
                                                    round.racers = r3;
                                                    if (count3 == max3) {
                                                        subCategory.rounds = r2;
                                                        count2++;
                                                        if (count2 == max2) {
                                                            count1++;
                                                            if (count1 == max1) {
                                                                tournament.days = r;
                                                                count++;
                                                                sails.log('---------------------------' + count);
                                                                if (count == max) {
                                                                    that.insertData(data);
                                                                    return res.ok(data);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }, function (err) {
                                                    count3++;
                                                    round.racers = [];
                                                    if (count3 == max3) {
                                                        subCategory.rounds = r2;
                                                        count2++;
                                                        if (count2 == max2) {
                                                            count1++;
                                                            if (count1 == max1) {
                                                                tournament.days = r;
                                                                count++;
                                                                sails.log('---------------------------' + count);
                                                                if (count == max) {
                                                                    that.insertData(data);
                                                                    return res.ok(finalData);
                                                                }
                                                            }
                                                        }
                                                    }
                                                });
                                            });
                                        } else {
                                            subCategory.rounds = r2;
                                            count2++;
                                            if (count2 == max2) {
                                                count1++;
                                                if (count1 == max1) {
                                                    tournament.days = r;
                                                    count++;
                                                    sails.log('---------------------------' + count);
                                                    if (count == max) {
                                                        that.insertData(data);
                                                        return res.ok(finalData);
                                                    }
                                                }
                                            }
                                        }
                                    }, function (err) {
                                        subCategory.rounds = [];
                                        count2++;
                                        if (count2 == max2) {
                                            count1++;
                                            if (count1 == max1) {
                                                tournament.days = r;
                                                count++;
                                                sails.log('---------------------------' + count);
                                                if (count == max) {
                                                    that.insertData(data);
                                                    return res.ok(finalData);
                                                }
                                            }
                                        }
                                    });
                                });
                            } else {
                                count1++;
                                if (count1 == max1) {
                                    tournament.days = r;
                                    count++;
                                    sails.log('---------------------------' + count);
                                    if (count == max) {
                                        that.insertData(data);
                                        return res.ok(finalData);
                                    }
                                }
                            }
                        });
                    } else {
                        count++;
                        sails.log('---------------------------' + count);
                        tournament.days = r;
                        if (count == max) {
                            that.insertData(data);
                            return res.ok(finalData);
                        }
                    }
                }, function (err) {
                    count++;
                    sails.log('---------------------------' + count);
                    tournament.days = [];
                    if (count == max) {
                        that.insertData(data);
                        return res.ok(finalData);
                    }
                });
            });
        }, function (err) {
            return res.badRequest(err);
        });
    },
    insertData: function (data) {
        var racing=SportsBetService.addRacing(data.name[0]);
        racing.then(function(obj){
            data.tournaments.forEach(function(tournament,i,tournaments){
                var addTournament=SportsBetService.addTournament({name:tournament.name[0],href:tournament.href[0]},obj.id);
                addTournament.then(function(obj) {
                    tournament.days.forEach(function (day, i, days) {
                        var addDay = SportsBetService.addDay({name:day.name[0]},obj.id);
                        addDay.then(function(obj){
                            day.subCategories.forEach(function(subCategory,i,subCategories){
                                var addSubCategory=SportsBetService.addSubCategory({name:subCategory.name[0],href:subCategory.href[0]},obj.id);
                                addSubCategory.then(function(obj){
                                    subCategory.rounds.forEach(function(round,i,rounds){
                                        var addRound=SportsBetService.addRound({number:round.number[0],startTime:round.startTime[0],href:round.href[0]},obj.id);
                                        addRound.then(function(obj){
                                            var max=round.racers.length;
                                            var count=0;
                                            round.racers.forEach(function(racer,i,racers){
                                                var addRacer=SportsBetService.addRacer(racer,obj.id);
                                                addRacer.then(function(obj){
                                                    count++;
                                                    if(count==max){
                                                        sails.log('Done');
                                                        return true;
                                                    }
                                                },function(err){
                                                    sails.log(err);
                                                });
                                            });
                                        },function(err){
                                            sails.log(err);
                                        });
                                    });
                                },function(err){
                                    sails.log(err);
                                });
                            });
                        },function(err){
                            sails.log(err);
                        });
                    })
                });
                },function(err){
                    sails.log(err);
                });
        },function(err){
            sails.log(err);
        });
        return true;
    }
};