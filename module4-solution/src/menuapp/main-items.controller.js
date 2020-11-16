(function() {
    "use strict";

    angular.module("MenuApp")
    .controller("MainItemsController", MainItemsController);

    MainItemsController.$inject = ["$stateParams", "items"];
    function MainItemsController($stateParams, items) {
        var ctrl = this;

        ctrl.items = items;
    }

})();
