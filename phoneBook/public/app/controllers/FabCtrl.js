(function(){

    function FabCtrl ($scope){
        var vm = this;
        vm.parentCtrl = $scope.ctrl;
        $scope.$on('hideAllForms',function(){
            vm.hideForm();
        });
    }

    FabCtrl.prototype.showAddGroupFrom = function(){
        this.parentCtrl.showGroupFrom = true;
        this.parentCtrl.showContactForm = false;
    };

    // displays the add new phone number form
    FabCtrl.prototype.addNumberForm = function(){
        this.parentCtrl.showNumberForm = true;
    };

    // displays the add new contact form
    FabCtrl.prototype.showAddContactForm = function(){
        this.parentCtrl.showContactForm = true;
        this.parentCtrl.showGroupFrom = false;
    };

    FabCtrl.prototype.hideForm = function(){
        this.parentCtrl.showContactForm = false;
        this.parentCtrl.showGroupFrom = false;
        this.parentCtrl.showNumberForm = false;
    };

    angular
        .module('app')
        .controller('FabCtrl',['$scope',FabCtrl]);
})();