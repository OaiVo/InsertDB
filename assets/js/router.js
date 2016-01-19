/**
 * Created by oaivo on 1/15/16.
 */

'use strict';
var InsertDBApp = angular.module('InsertDBApp', [
    'ui.router',
    'ngFileUpload'
]);

InsertDBApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home',{
            url: "/home",
            templateUrl: "/templates/index.html",
            controller: "IndexCtrl"
        })
        .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html"
        })
        .state('state1.list', {
            url: "/list",
            templateUrl: "partials/state1.list.html",
            controller: function($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
});
