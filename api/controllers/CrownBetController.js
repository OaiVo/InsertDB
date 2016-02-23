/**
 * Created by oaivo on 2/3/16.
 */
var request = require('request');
module.exports = {
    getDataToday: function (req, res) {
        var that = this;
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
        var today = '' + year + month + day;
        request('https://crownbet.com.au/api/racing/racing/today/horse-racing', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body).result[0].Locations;
            } else {
                return res.badRequest('Do not get data');
            }
            var count=0;
            var max=data.length;
            data.forEach(function (tournament, index, tournaments) {
                var addTournament = CrownBetService.addTournament(tournament.name, today);
                addTournament.then(function (data2) {
                    count++;
                    var count2=0;
                    var max2=tournament.Events.length;
                    tournament.Events.forEach(function (subCategory, index, subCategories) {
                        var addSubCategory = CrownBetService.addSubCategory(subCategory, data2.id);
                        addSubCategory.then(function (data3) {
                            count2++;
                            var count3=0;
                            var max3=subCategory.Events.length;
                            subCategory.Events.forEach(function (round, index, rounds) {
                                var addRound = CrownBetService.addRound(round, data3.id);
                                addRound.then(function (data4) {
                                    count3++;
                                    for (var i = 0; i < 8; i++) {
                                        var racer=CrownBetService.crawling(data3.slug, today, i, data3.subCategoryId, data4.roundId);
                                        racer.then(function(data){
                                            //sails.log(data);
                                            if(i==7) return res.ok();
                                        },function(err){
                                            return res.badRequest(err);
                                        });
                                    }
                                }, function (err) {
                                    sails.log(err);
                                    return res.badRequest(err);
                                });
                            });
                        }, function (err) {
                            sails.log(err);
                            return res.badRequest(err);
                        });
                    });
                }, function (err) {
                    sails.log(err);
                    return res.badRequest(err);
                });
            });
        })
    },
    test: function (req, res) {
        var racer=CrownBetService.crawling('ararat', '20160215', 1, '243761', '12794565');
        racer.then(function(data){
            return res.ok(data);
        },function(err){
            return res.badRequest(err);
        });
    }
};