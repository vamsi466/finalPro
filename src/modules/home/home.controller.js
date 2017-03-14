module.exports = function(homeService) {

    var home = {};

    home.cardsData = [];

    homeService.getCardsData().then(function(response) {
        home.cardsData = response.data;
    });

    return home;
};