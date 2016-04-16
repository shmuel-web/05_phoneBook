(function(){

    function FormCtrl ($scope){
        var vm = this;
        vm.parentCtrl = $scope.ctrl;
        $scope.$on('hideAllForms',function(){
            vm.hideForm();
        });
    }

    FormCtrl.prototype.showAddGroupFrom = function(){
        console.log('addGroupFrom');
        this.parentCtrl.showGroupFrom = true;
        this.parentCtrl.showContactForm = false;
    };

    // displays the add new phone number form
    FormCtrl.prototype.addNumberForm = function(){
        console.log('1');
        this.parentCtrl.showNumberForm = true;
    };

    // displays the add new contact form
    FormCtrl.prototype.showAddContactForm = function(){
        console.log('2');
        this.parentCtrl.showContactForm = true;
        this.parentCtrl.showGroupFrom = false;
    };

    FormCtrl.prototype.hideForm = function(){
        console.log('hide');
        this.parentCtrl.showContactForm = false;
        this.parentCtrl.showGroupFrom = false;
        this.parentCtrl.showNumberForm = false;
    };

    angular
        .module('app')
        .controller('FormCtrl',['$scope',FormCtrl]);
})();