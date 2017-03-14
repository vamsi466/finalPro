


// Templates
require('./setup.tpl.html');

// styles
 require('./setup.sass');

// //js
var ctrl = require('./cell.controller.js');

// //views

require('./view/cell.tpl.html');
require('./view/telematic.tpl.html');
require('./view/keyswitchinput.tpl.html');



//json

require('./setup.cell.json');

// setup module
var app = angular.module('cecApp.setup',['ui.router','ngTable']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  			$urlRouterProvider.when('/setup','/setup/cell');
			
			$stateProvider
			  .state('setup.cell', {
			    url:'/cell',
			    templateUrl: 'cell.tpl.html'
			  })

			  .state('setup.telematic', {
			    url:'/telematic',
			    templateUrl: 'telematic.tpl.html'
			  })

			  .state('setup.keyswitchinput', {
		          url:'/keyswitchinput',
		          templateUrl: 'keyswitchinput.tpl.html'
		      });
		}]);
app.controller('cellCtrl',['$http','$q','NgTableParams',ctrl]);
module.exports = app;

