require('./homeData.json');

module.exports = function($http) {

    this.getCardsData = getCardsData;

    function getCardsData() {
        return $http.get("data/homeData.json");
    }
};