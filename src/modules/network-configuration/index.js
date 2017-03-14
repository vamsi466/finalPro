// Templates
require('./network-configuration.tpl.html');

//styles
require('./network-configuration.sass');
require('./views/wifi.tpl.html');
require('./views/savedNetworks.tpl.html');
require('./views/addNetwork.tpl.html');
require('./views/hotspot.tpl.html');
require('./views/port_forward.tpl.html');

require('./js/wifi.controller.js');
require('./js/hotspot.controller.js');
require('./js/port_forward.controller.js');
var commonAjaxService = require('./js/network-config.service.js');
var app = angular.module('cecApp.netwkConf', ['ui.router', 'cecApp.netwkConf.wifi', 'cecApp.netwkConf.hotspot', 'cecApp.netwkConf.portForward']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/networkconfig/wifi');
    $urlRouterProvider.when('/networkconfig', '/networkconfig/wifi');

    $stateProvider
        .state('networkconfig.wifi', {
            url: '/wifi',
            templateUrl: 'wifi.tpl.html',
            controller: 'wifiCtrl',
            controllerAs: 'wifi'
        })

    .state('networkconfig.hotspot', {
        url: '/hotspot',
        templateUrl: 'hotspot.tpl.html',
        controller: 'hotspotCtrl',
        controllerAs: 'hotspot'
    })

    .state('networkconfig.portForwarding', {
        url: '/port-forwarding',
        templateUrl: 'port_forward.tpl.html',
        controller: 'portForwardCtrl',
        controllerAs: 'port'
    });
}]);
app.service('myService', commonAjaxService);
module.exports = app;