module.exports = {
    crawling: function (req, res) {
        var url = 'https://www.ladbrokes.com.au/racing/horses/';
        var that=this;
        var getTournaments=LadBrokesServices.getTournaments(url);
        getTournaments.then(function(tournamentsData){
            tournamentsData.forEach(function(tournament,i,tournaments){
                var addTournament=LadBrokesServices.addTournament(tournament.name[0]); // Insert Tournament
                addTournament.then(function(data){
                    tournament.locations.forEach(function(location,i,locations){
                        var addLocation=LadBrokesServices.addLocation(location,data.id); // Insert Loation
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