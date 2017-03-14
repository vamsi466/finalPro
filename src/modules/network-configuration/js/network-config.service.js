module.exports =	function($http) {
        this.info = function(x) {
            return $http.get(x).then(function(response) {
                return response.data;
            });
        };
    };
