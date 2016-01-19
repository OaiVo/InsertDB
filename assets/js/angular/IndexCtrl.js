/**
 * Created by oaivo on 1/15/16.
 */

InsertDBApp.controller('IndexCtrl', function ($scope, $log, $http, Upload) {
    // upload later on form submit or something similar
    $scope.canSubmit = function () {
        return $scope.form.$valid && $scope.files;
    }
    $scope.submit = function () {
        $scope.uploadFiles($scope.files);
    };
    $scope.listFiles = function () {
        $scope.list = [];
        angular.forEach($scope.files, function (file) {
            $scope.list.push(file.name);
        });
    };
    $scope.status=0;
    $scope.message='';
    // for multiple files:
    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            angular.forEach(files, function (file) {
                Upload.upload({
                    url: 'data/addData',
                    data: {file: file}
                }).then(function (data) {
                    $scope.message='Inserted Data';
                    console.log(data);
                    console.log('Success ' + data.config.data.file.name + 'uploaded. Response: ' + data.data);
                }, function (err) {
                    $log.debug('Error status: ', err);
                    $scope.message='Something wrong: ' + err.data;
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    $scope.message='Uploading....Please wait!!';
                    $scope.status=1;
                });
            });
        }
    }
});
