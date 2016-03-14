module.exports = {
    crawling: function (req, res) {
        var date=req.param('date');
        if(date=='today'){
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
            var day= year +'-'+ month+'-' + day;
        }else if(date=='tomorrow'){
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
            var day = year +'-'+ month+'-' + day;
        }else {
            return res.badRequest('Invalid Date!!');
        }
        var url = 'https://www.williamhill.com.au/horse-racinggrid/meetings/'+date;
        var getTournaments=WilliamHillService.getTournaments(url); //get Tournament
        getTournaments.then(function(tournamentsData){
            tournamentsData.forEach(function(tournament,i,tournaments){
                var addTournament=WilliamHillService.addTournament(tournament.name[0],day);
                addTournament.then(function(data){
                    tournament.locations.forEach(function(location,i2,locations){
                        var addLocation=WilliamHillService.addLocation(location,data.id);
                        addLocation.then(function(data2){
                            location.url.forEach(function(url,i3,urls){
                                var addRound=WilliamHillService.addRound(i3+1,url,data2.id);
                                addRound.then(function(data3){
                                    var getRacers=WilliamHillService.getRacers(data3.url);
                                    getRacers.then(function(racersData){
                                        racersData.forEach(function(racer,i4,racers){
                                            var addRacer=WilliamHillService.addRacer(racer,data3.id);
                                            addRacer.then(function(data4){
                                                sails.log('Done!!');
                                                return res.ok();
                                            },function(err){
                                                sails.log(err);
                                            });
                                        });
                                    },function(err){
                                        sails.log(err);
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
                    sails.log();
                });
            });
        },function(err){
            sails.log(err);
        });
    },
    getData: function(req,res){
        var date=req.param('date');
        if(date=='today'){
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
            var day= year +'-'+ month+'-' + day;
        }
        else if(date=='tomorrow'){
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
            var day = year +'-'+ month+'-' + day;
        }
        else {
            return res.badRequest('Invalid Date!!');
        }
        var r = WilliamHillService.getData1(day);
        r.then(function(data){
            var max=data.length;
            var count=0;
            if(max>0){
                data.forEach(function(tournament,i,tournaments){
                    var max2=tournament.locationWH.length;
                    var count2=0;
                    if(max2>0) {
                        tournament.locationWH.forEach(function (location, i2, locations) {
                            var r2 = WilliamHillService.getData2(location.id);
                            r2.then(function (data2) {
                                location.RoundWH = data2;
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
                    }else {
                        count++;
                        if (count == max) {
                            sails.log('Successfully!!');
                            return res.ok(data);
                        }
                    }
                });
            }else{
                return res.ok({});
            }
        },function(err){
            return res.badRequest('Do not get data');
        });
    },
    test: function (req, res) {
        //var url = 'https://www.williamhill.com.au/horse-racinggrid/meetings/Today';
        var url = 'https://www.williamhill.com.au/horse-racing/20245780/flamingo-pk-1';
        var getData=WilliamHillService.getRacers(url);
        getData.then(function(data){
            return res.ok(data);
        },function(err){
            sails.log(err);
            return res.badRequest(err);
        });
    }
};