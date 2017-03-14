require('../data/portForwarding.json');
var app = angular.module('cecApp.netwkConf.portForward',['ngTable']);

app.controller('portForwardCtrl',['NgTableParams','myService',function(NgTableParams,myService){
	var port = {};
	port.portForwarding = new NgTableParams({}, {
        counts: [],
        getData: function() {
            return myService.info('data/portForwarding.json');
        }

    });
	return port;
}]);

module.exports = app;