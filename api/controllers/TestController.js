/**
 * Created by oaivo on 2/17/16.
 */
var request = require('request');
module.exports = {
    test: function (req, res) {
        var test=TestService.crawling();
        test.then(function(data){
            sails.log(data);
            return res.ok(data);
        },function(err){
            return res.badRequest(err);
        });
    }
};