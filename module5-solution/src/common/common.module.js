(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://nacho-coursera.herokuapp.com')
.config(config);
//https://ychaikin-course5.herokuapp.com

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
