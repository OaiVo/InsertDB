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
        var url = 'https://www.ladbrokes.com.au/racing/horses/?date='+day;
        var that=this;
        var getTournaments=LadBrokesServices.getTournaments(url); //get Tournament
        getTournaments.then(function(tournamentsData){
            tournamentsData.forEach(function(tournament,i,tournaments){
                var addTournament=LadBrokesServices.addTournament(tournament.name[0]); // Insert Tournament
                addTournament.then(function(data){
                    tournament.locations.forEach(function(location,i,locations){
                        var addLocation=LadBrokesServices.addLocation(location,data.id); // Insert Location
                        addLocation.then(function(data2){
                            var getRound = LadBrokesServices.getRounds('https://www.ladbrokes.com.au'+data2.url);
                            getRound.then(function(roundsData){
                                roundsData.forEach(function(round,i,rounds){
                                    var addRound = LadBrokesServices.addRound(round,data2.id);
                                    addRound.then(function(data3){
                                        var getRacers=LadBrokesServices.getRacers('https://www.ladbrokes.com.au'+data3.url);
                                        getRacers.then(function(racersData){
                                            racersData.forEach(function(round,i,rounds){
                                                var addRacer=LadBrokesServices.addRacer(round,data3.id);
                                                addRacer.then(function(data4){
                                                    sails.log('Done!');
                                                    return res.ok();
                                                },function(err){
                                                    sails.log(err);
                                                    return res.badRequest(err);
                                                });
                                            });
                                        },function(err){
                                            sails.log(err);
                                            return res.badRequest(err);
                                        });
                                    },function(err){
                                        sails.log(err);
                                        return res.badRequest(err);
                                    });
                                });
                            },function(err){
                                sails.log(err);
                                return res.badRequest(err);
                            });
                        },function(err){
                            sails.log(err);
                            return res.badRequest(err);
                        });
                    });
                },function(err){
                    sails.log(err);
                    return res.badRequest(err);
                });
            });
            return res.ok();
        },function(err){
            sails.log(err);
            return res.badRequest(err);
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
        var r = LadBrokesServices.getData1(day);
        r.then(function(data){
            var max=data.length;
            var count=0;
            data.forEach(function(tournament,i,tournaments){
                var max2=tournament.locationLB.length;
                var count2=0;
                tournament.locationLB.forEach(function(location,i2,locations){
                    var r2=LadBrokesServices.getData2(location.id);
                    r2.then(function(data2){
                        location.roundLB = data2;
                        sails.log(location);
                        count2++;
                        if(count2==max2){
                            count++;
                            if(count==max){
                                sails.log(4);
                                return res.ok(data);
                            }
                        }
                    },function(err){
                        return res.badRequest('Do not get data');
                    });
                });
            });
            return res.ok(obj);
        },function(err){
            return res.badRequest('Do not get data');
        });
    },
    test: function (req, res) {
        var url = 'https://www.ladbrokes.com.au/racing/horses/bendigo/next/';
        sails.log(1);
        var getData=LadBrokesServices.getRacers(url);
        getData.then(function(data){
            return res.ok(data);
        },function(err){
            sails.log(err);
            return res.badRequest(err);
        });
    }
};