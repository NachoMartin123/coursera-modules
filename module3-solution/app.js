(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive("foundItems", FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective (){
    var ddo ={
        templateUrl: 'foundItems.html',
        scope: {
            found: "<",
            onRemove: "&"
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'ctrl',//como llamamos a directive controller dentro de foundItems.html
        bindToController: true //necesario para acceder a data pasada por scope
    };

    return ddo;
}

//para la directiva es necesario definir el controlador porque recibe close
//atributos y métodos que le pasamos por el ddo (array found y método onRemove)
function FoundItemsDirectiveController() {
    var ctrl = this;

}


//wrap your search textbox and button as well as the list of found items.
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
    var ctrl = this;

    ctrl.found = [];

    ctrl.getMatchedMenuItems = function () {
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

        promise.then(function (response) {
            ctrl.found=response;
            //console.log("-----------FOUND:------------");
            //console.log("length: "+ctrl.found.length);
            //console.log(ctrl.found);
        })
        .catch(function (error) {
          console.log(error);
        })
    };

    ctrl.removeItem = function (itemIndex) {
        MenuSearchService.removeItem(itemIndex);
    };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;

    var foundItems = [];
    //responsible for reaching out to the server (using the $http service)
    //to retrieve the list of all the menu items.
    service.getMatchedMenuItems = function (searchTerm){
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            // process result and only keep items that match
            foundItems = [];
            //console.log("length: " + result.data.menu_items.length);
            //console.log("searchTerm: "+searchTerm);
            //console.log(result.data.menu_items);
            if(result.data.menu_items.length!=0 && searchTerm){
                var i;
                for (i = 0; i < result.data.menu_items.length; i++){
                    if(result.data.menu_items[i].description.includes(searchTerm))
                        foundItems.push(result.data.menu_items[i]);
                }

            }
            // return processed items
            return foundItems;
        })
        .catch(function (error) {
          console.log(error);
        })
    };

    service.removeItem = function (itemIndex) {
        foundItems.splice(itemIndex, 1);
    };

}

})();
