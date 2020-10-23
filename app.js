(function () {
    'use strict'; //asegura no cometer errores como declarar variables
    //que fuera de esta funcion

    angular.module('MyFirstApp', [])//returns module instance
    .controller("MyFirstController", function($scope){//nombre controlador y funcion que lo controla
        $scope.name = "Nacho";
        $scope.sayHello = function (){
            return "Hello coursera";
        }
    });
})();
