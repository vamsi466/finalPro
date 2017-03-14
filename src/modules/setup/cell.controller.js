require('./setup.cell.json');

var app = function($http, $q, NgTableParams) {

    var cell = {};

    cell.componentDetails = new NgTableParams({}, {

        counts: [],

        getData: function() {
            return $http.get('data/setup.cell.json').
            then(function(response) {
                return response.data.Cell;
            });
        }
    });
    return cell;
};

module.exports = app;