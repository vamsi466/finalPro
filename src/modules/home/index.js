var homeController = require('./home.controller.js');
var homeService = require('./home.service.js');
require('./home.sass');
require('./home.tpl.html');

var app = angular
    .module('cecApp.home', [])
    .controller('homeCtrl', ['homeService', homeController])
    .service('homeService', ['$http', homeService]);
module.exports = app;