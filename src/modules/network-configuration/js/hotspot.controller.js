require('../data/serviceNetwork.json');
var app = angular.module('cecApp.netwkConf.hotspot',['ngTable']);

app.controller('hotspotCtrl',['NgTableParams','myService',function(NgTableParams,myService){
	var hotspot = {};
	hotspot.show = true;
	hotspot.isChecked = false;
	hotspot.hotspotData = new NgTableParams({}, {
        counts: [],
        getData: function() {
            return myService.info('data/serviceNetwork.json');
        }

    });

	hotspot.toggleSwitch = function(){

		if(!hotspot.isChecked){
			hotspot.show=true;
			angular.element( document.querySelector( '.hotspot-table' ) ).addClass('disable-table');

		}
		else{
			angular.element( document.querySelector( '.hotspot-table' ) ).removeClass('disable-table');
		}
	};

	return hotspot;
}]);

module.exports = app;