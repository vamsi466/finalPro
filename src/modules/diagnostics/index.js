require("./reboot/index");
require("./network-interface/index");
require("./scantool/index");
require("./ping/index");

require('./diagnostics.tpl.html');
// SCSS
require('./diagnostics.sass');

var app = angular.module('cecApp.diagnostics', [
    // Vendor
    'ngTable',
    'ui.router',

    //Modules
    'cecApp.diagnostics.ping',
    'cecApp.diagnostics.reboot',
    'cecApp.diagnostics.scantool',
    'cecApp.diagnostics.network-interface'
]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/diagnostics', '/diagnostics/network-interface');

    $stateProvider
        .state('diagnostics.ping', {
            url: '/ping',
            templateUrl: 'ping.tpl.html',
            controller: 'pingCtrl',
            controllerAs: 'pnc'
        })

    .state('diagnostics.networkinterface', {
        url: '/network-interface',
        templateUrl: 'network-interface.tpl.html'
    })

    .state('diagnostics.scantool', {
            url: '/scan-tool',
            templateUrl: 'scantool.tpl.html',
            controller: 'scantoolCtrl',
            controllerAs: 'st'
        })
        .state('diagnostics.reboot', {
            url: '/reboot',
            templateUrl: 'reboot.tpl.html'
        });
}]);

module.exports = app;