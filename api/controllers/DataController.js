/**
 * Created by oaivo on 1/18/16.
 */
var fs = require('fs-extra');
module.exports = {
    addData: function (req, res) {
        var file = req.file('file');
        req.file('file').upload(function (err, uploadedFiles) {
            if (err) {
                sails.log(err);
                return res.badRequest(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            //var path = '/.tmp/uploads/' + uploadedFiles[0].fd.split('/').pop();
            var path = uploadedFiles[0].fd;
            fs.readFile(path, 'utf8' ,function (err, data) {
                if (err) {
                    return res.badRequest('Not read a json file');
                }
                try {
                    var obj = JSON.parse(data);
                    var r = DataService.addData(obj);
                    r.then(function(resData){
                        return res.ok();
                    },function(err){
                        return res.badRequest(err);
                    });
                } catch (e) {
                    return res.badRequest('Not parse to json');
                }
                fs.remove(path);
            });
        });
    },
    getData: function(req,res){
        var r = DataService.getAllData();
        r.then(function(obj){
            return res.ok(obj);
        },function(err){
            return res.badRequest('Do not get data');
        });
    }
};
