var app = function($http, NgTableParams) {
    var ts = {};
    ts.componentDetails = new NgTableParams({}, {
        counts: [],
        noPager: true,

        getData: function() {
            return $http.get('data/scantool.json').
            then(function(response) {
                return response.data.scanTools;
            });
        }
    });
    return ts;
};
module.exports = app;