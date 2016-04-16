(function(){
    "use strict";
    function HeaderCtrl ($scope,dataServcie,phoneBookService){
        this.parentCtrl = $scope.ctrl;
        this.data = dataServcie;
        this.phoneBook = phoneBookService;

    }

       //header =========================================
    HeaderCtrl.prototype.up = function(){
        this.parentCtrl.displayCurrentItem(this.parentCtrl.currentItem.parent);
    };

    HeaderCtrl.prototype.back = function(){
        this.parentCtrl.displayCurrentItem(this.parentCtrl.currentItem.backItem);
    };

        //reset btn function asks the user & restore to defaults
    HeaderCtrl.prototype.reset = function(){
        $('#reset-modal').openModal();
        var self = this;
        $('#reset-confirm').one('click',function(){
            var content = '<i class="material-icons small red-text">restore</i><span>your phone book is set bck to default </span>';
            Materialize.toast(content, 4000);
            self.phoneBook.reset();
            self.data.save();
            self.parentCtrl.displayCurrentItem(self.phoneBook.root);
            self.parentCtrl.$scope.$apply();
        });

    };

    HeaderCtrl.prototype.search = function(event) {
        var results = this.phoneBook.search(this.searchParam);
        var resObj = {
            searchResult:true,
            searchParam:this.searchParam,
            childItems:results,
            backItem:this.parentCtrl.currentItem
        };
        this.parentCtrl.displayCurrentItem(resObj);
        this.searchParam = "";
        var inputField = event.target.firstElementChild.firstElementChild;
        inputField.blur();
    };

    angular
        .module('app')
        .controller('HeaderCtrl',['$scope','dataService','phoneBookService',HeaderCtrl]);
})();