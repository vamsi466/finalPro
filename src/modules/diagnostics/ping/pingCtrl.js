var app = function() {
    var pnc = {};
    pnc.portNumbers = ["192.168.16.106", "192.168.16.107", "192.168.16.108"];
    // pnc.portEntered = "";
    pnc.correctPort = false;
    pnc.wrongPort = true;
    pnc.checkWithPorts = function() {

        for (var iCtrl = 0; iCtrl < pnc.portNumbers.length; iCtrl++) {
            if (pnc.portNumbers[iCtrl] == pnc.portInput) {
                pnc.correctPort = true;
                pnc.wrongPort = true;
                break;
            } else {
                pnc.correctPort = false;
                pnc.wrongPort = false;
                break;
            }
        }
    };

    return pnc;
};
module.exports = app;