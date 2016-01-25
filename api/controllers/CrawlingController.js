/**
 * Created by oaivo on 1/22/16.
 */
var htmlToJson = require('html-to-json');
module.exports = {
    crawling: function (req, res) {
        var url = req.param('url');
        if (url == undefined || url == '') {
            return res.badRequest('Url not found');
        }
        if (url.trim().startsWith('https://www.pinnaclesports.com/')) {

            var promise = htmlToJson.request(url, {
                'Category': ['.level-2', {
                    name: ['span', function ($span) {
                        return $span.text();
                    }],
                    subCategory: ['ul > li >a', function ($a) {
                        return $a.text();
                    }]
                }]
            }, function (err, result) {
                //console.log(result);
                return res.ok(result);
            });

            promise.done(function (result) {
                //Works as well
            });
        } else {
            return res.badRequest('Domain wrong');
        }
    }
};