"use strict";

var BL = BL || {};

BL.helpers = (function () {
    var nextId = 1;

    function generateId() {
        return nextId++;
    }

    return {
        generateId: generateId,
    }
})();