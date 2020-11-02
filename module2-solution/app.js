(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getItemsToBuy();

    list.buyItem = function (itemIndex) {
        try {
            ShoppingListCheckOffService.buyItem(itemIndex);
        } catch (error) {
            list2.errorMessage = error.message;
        }
    }

    list.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(list.items, itemIndex);
    };

}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getItemsBought();

}





function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
        {name: "coockies", quantity: 10},
        {name: "bananas", quantity: 5},
        {name: "bags of tea", quantity: 30},
        {name: "oranges", quantity: 15},
        {name: "yogurts", quantity: 6}
    ];;
    var itemsBought = [];

    service.buyItem = function (index) {
        try{
            var itemAux = {
                name: itemsToBuy[index].name,
                quantity: itemsToBuy[index].quantity
            };
            console.log(itemAux);
            service.removeItem(itemsToBuy, index);
            itemsBought.push(itemAux);
        }catch (error){
            console.log(error.message);
        }
    };

    service.removeItem = function (itemsList, itemIndex) {
        itemsList.splice(itemIndex, 1);
    };

    service.getItemsToBuy = function () {
        return itemsToBuy;
    };
    service.getItemsBought = function () {
        return itemsBought;
    };

}



})();
