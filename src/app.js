/*** APPLICATION ***/

// Modules
require('./modules/common/header/index');
require('./modules/common/sidenav/index');
require('./modules/home/index');
require('./modules/setup/index');
require('./modules/network-configuration/index');
require('./modules/rtk-rebroadcast/index');
require('./modules/diagnostics/index');
require('./modules/system-settings/index');

// CSS
require('./assets/TrimbleCore/css/app-bootstrap.css');
require('./assets/TrimbleCore/css/trimble.2.css');
require('./assets/TrimbleCore/css/trimble.css');

// SCSS
require('./assets/sass/app.sass');

// Init App
var app = angular.module('cecApp', [
    // Vendor
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',

    //Modules
    'cecApp.header',
    'cecApp.sidenav',
    'cecApp.home',
    'cecApp.setup',
    'cecApp.netwkConf',
    'cecApp.rebroadcast',
    'cecApp.diagnostics',
    'cecApp.sysSettings'
]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home.tpl.html',
                controller: 'homeCtrl',
                controllerAs: 'dc'
            })
            .state('networkconfig', {
                url: '/network-configuration',
                templateUrl: 'network-configuration.tpl.html',
            })
            .state('setup', {
                url: '/setup',
                templateUrl: 'setup.tpl.html'
            })
            .state('rebroadcast', {
                url: '/rtk-rebroadcast',
                templateUrl: 'rebroadcast.tpl.html'
            })

        .state('diagnostics', {
                url: '/diagnostics',
                templateUrl: 'diagnostics.tpl.html'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'system-settings.tpl.html'
            });
    }])
    .controller('mainCtrl', function() {

    });
module.exports = app;