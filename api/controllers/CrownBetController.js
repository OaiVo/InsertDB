/**
 * Created by oaivo on 2/3/16.
 */
var request = require('request');
module.exports = {
    getDataToday: function (req, res) {
        request('https://crownbet.com.au/api/racing/racing/today/horse-racing', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body)
            }else{
                return res.badRequest('Do not get data');
            }
            return res.ok(data);
        })
    }
};