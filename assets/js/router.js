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
});
