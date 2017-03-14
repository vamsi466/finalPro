require('./scantool.tpl.html');
require('./scantool.json');
require('./scantool.sass');
var scantoolCtrl = require("./scantoolCtrl.js");

var app = angular.module('cecApp.diagnostics.scantool', [])
    .controller('scantoolCtrl', ['$http', 'NgTableParams', scantoolCtrl]);
module.exports = app;