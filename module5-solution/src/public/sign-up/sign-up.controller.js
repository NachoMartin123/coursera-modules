(function () {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ["MenuService", "UserService"];
function SignUpController(MenuService, UserService) {
  var ctrl = this;
  //en form crea:
  //    myInfoForm.user.firstname
  //    myInfoForm.user.lastName
  //    myInfoForm.user.email
  //    myInfoForm.user.phone
  //    myInfoForm.reg.favDish

  ctrl.submit = function () {
    ctrl.errorFavDish=false;
    console.log(ctrl.user);

    //LLamada GET short_name
    console.log("shortName: "+ctrl.shortname);
    MenuService.getDishByShortName(ctrl.shortname)
    .then(function (response) {
        ctrl.user.favdish = response.data;
        UserService.setUser(ctrl.user);//save data in user service
        ctrl.completed = true;
    }, function(error){
        ctrl.errorFavDish=true;
    });

  };
}

})();
