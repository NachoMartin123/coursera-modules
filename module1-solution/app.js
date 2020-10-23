(function () {
    'use strict';

    angular.module('LunchCheck', [])//returns module instance
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.inject=["$scope"];

    function LunchCheckController($scope){
        $scope.message  = "";
        $scope.countEmptyItems  = 0;
        $scope.lunchList = "";
        $scope.colorText = "";

        $scope.checkLunch = function (){
            $scope.colorText="green";
            if($scope.lunchList==""){
                $scope.message  = "Please enter data first";
                $scope.colorText="red";
            }else{
                emptyItemsCount();
                if ($scope.lunchList.split(",").length-$scope.countEmptyItems <= 3)
                    $scope.message  = "Enjoy!";
                else if ($scope.lunchList.split(",").length-$scope.countEmptyItems > 3){
                    $scope.message  = "Too much!";
                    $scope.colorText="red";
                }

                $scope.message += " Note: Empty items: "+$scope.countEmptyItems;

            }
        }


        function emptyItemsCount(){
            $scope.countEmptyItems=0;//var count =0;
            var items = $scope.lunchList.split(',');
            for (var i=0; i<items.length;i++){
                if(items[i].trim()==""){
                    $scope.countEmptyItems++;//count++;
                }
            }
        }


    }

})();
