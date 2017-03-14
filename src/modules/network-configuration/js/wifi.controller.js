require('../data/networkType.json');
var app = angular.module('cecApp.netwkConf.wifi',['ngTable','cecApp.netwkConf']);

app.controller('wifiCtrl',['NgTableParams','myService',function(NgTableParams,myService){
	var wifi = {};
	wifi.wifiNetwork = createTable("data/networkType.json");

    function createTable(data){
        if(typeof data === 'string'){
            return new NgTableParams({}, {
                counts: [],
                getData: function() {
                    return myService.info(data);
                }

             });
        }else if(Array.isArray(data) === true){
            return new NgTableParams({}, {
                    counts: [],
                    dataset:data
                });
        }else{
            return "";
        }

    }

	function connectNetwork(selectedNetwork,index){
    	var data = [];
    	data.push(selectedNetwork);
    	wifi.wifiNetwork.data.splice(index,1);
    	data = data.concat(wifi.wifiNetwork.data);
    	wifi.wifiNetwork = createTable(data);
    }
        
    wifi.selectNetwork = function(selectedNetwork,index){
    	if(selectedNetwork.password === ""){
    		connectNetwork(selectedNetwork,index);
    	}
    	else{
         
             angular.element(document.querySelector('#passwordModal')).modal('show');
            
    		

    	}
    };
    wifi.savedNetwork = function(){
        wifi.dataDelete = true;
        wifi.saveNetwork = createTable(wifi.wifiNetwork.data);
    };

    wifi.deleteNetwork = function(index){
        var data = [];
        wifi.saveNetwork.data.splice(index,1);
        data = angular.copy(wifi.saveNetwork.data);
        wifi.dataDelete = false;

        wifi.saveAfterDelete = function(){
            wifi.wifiNetwork = createTable(data);
        }  ; 
    };


	return wifi;
}]);

module.exports = app;