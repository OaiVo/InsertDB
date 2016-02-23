/**
 * Created by oaivo on 2/17/16.
 */

var q = require('q');
var htmlToJson = require('html-to-json');

module.exports = {
    crawling: function (slug, day, roundNumber, subCategoryId, roundId) {
        var d = q.defer();
        roundNumber++;
        var url = 'https://www.ladbrokes.com.au/racing/horses/canterbury/16774465-ranvet-mdn-hcp/';
        htmlToJson.request(url, {
            new: ['.entrant-details', function ($val) {
                return $val.html();
            }]
            /*racers: ['.details', {
             name: ['.details', function ($name) {
             return $name.text();
             var $content = $name.text().trim();
             var $content2 = $content.split('.');
             var $content3 = $content2[1].split('(');
             return $content3[0].trim();
             }],
             number: ['tbody>tr>.details', function ($name) {
             return $name.text();             var $content = $name.text().trim();
             var $content2 = $content.split('.');
             return $content2[0].trim();
             }],
             barrier: ['tbody>tr>.details', function ($name) {
             return $name.text();
             var $content = $name.text().trim();
             var $content2 = $content.split('(');
             var $content3 = $content2[1].split(')');
             return $content3[0].trim(')');
             }]/!*,
             win: ['.racing-bettype-row>.vis-row>.float-right>.dflt_win_price>a>span', function ($val) {
             return $val.text().trim();
             }],
             place: ['.racing-bettype-row>.vis-row>.float-right>li:nth-child(2)>a>span', function ($val) {
             //not(.dflt_win_price):not(.subtab-WO)
             return $val.text().trim();
             }]*!/
             }]*/
        }, function (err, data) {
            if (err) {
                return d.reject('Crawling has error' + err);
            } else {
                //sails.log(data.new);
                return d.resolve(data.new);
            }
        });
        return d.promise;
    }
}