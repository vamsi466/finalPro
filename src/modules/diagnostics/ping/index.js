require('./ping.tpl.html');
require('./ping.sass');

var pingCtrl = require("./pingCtrl.js");

var app = angular.module('cecApp.diagnostics.ping', [])
    .controller('pingCtrl', [pingCtrl]);

module.exports = app;