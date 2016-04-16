(function(){
    "use strict";
    function MainCtrl (phoneBookService,$scope,dataService) {
        var vm = this;
        vm.phoneBook = phoneBookService;
        vm.data = dataService;
        vm.currentItem = this.phoneBook.root;
        vm.currentItem.url = "app/partials/templates/root.html";
        vm.$scope = $scope;
    }

    //item view
    MainCtrl.prototype.editMode = function(){
        $('#title').focus();
    };

    MainCtrl.prototype.displayCurrentItem = function(item,callback){
        //    chek if it is root group or contact or search results
        //    & sets the url value to the proper partial template url accordingly
        if (item.fName){
            this.currentItem = item;
            this.currentItem.url = "app/partials/templates/contact.html";
        }
        else if(item.name && item.name != "Root"){
            this.currentItem = item;
            this.currentItem.url = "app/partials/templates/group.html";
        }
        else if (item.name == "Root"){
            this.currentItem = item;
            this.currentItem.url = "app/partials/templates/root.html";
        }
        else if (item.searchResult){
            this.currentItem = item;
            this.currentItem.url = "app/partials/templates/searchResults.html";
        }
        //if the user had a form open when he switches the view this closes all forms
        this.hideForm();
        if (callback){
            callback();
        }

    };

    //handls the add group form
    MainCtrl.prototype.addGroupFormHandler = function(){
        var self = this;
        this.currentItem.addSubGroup(this.groupName ,function(){
            self.groupName = "";
            self.hideForm();
            self.data.save();

            var content = '<i class="material-icons small green-text">done</i>' +
                '<span>a new group was added successfully </span>';

            //displays a small dialog to the user
            Materialize.toast(content, 4000);
        })
    };

    MainCtrl.prototype.addNumberFormHandler = function(){
        var self = this;
        this.currentItem.addPhoneNumber(this.number ,function(){
            self.number = "";
            self.hideForm();
            self.data.save();
            var content = '<i class="material-icons small green-text">done</i>' +
                '<span>the number was added successfully </span>';

            Materialize.toast(content, 4000);
        })
    };

    MainCtrl.prototype.addContactFormHandler = function(){
        var self = this;
        this.currentItem.addContact(this.fName, this.lName, [this.number] ,function(){
            self.fName = "";
            self.lName = "";
            self.number = "";
            self.hideForm();
            self.data.save();
            var content = '<i class="material-icons small green-text">done</i>' +
                '<span>a new contact was added successfully </span>';

            Materialize.toast(content, 4000);
        })
    };


    //when the user blurs the edit mode or press enter
    MainCtrl.prototype.updateItemName = function(newName,itemId){
        if (itemId){
            var item = this.phoneBook.getItemById(itemId)
        }
        else {
            var item = this.currentItem;
        }

        if (newName != ""){
            var newName = event.target.textContent;
            item.changeName(newName);
            this.data.save();
        }
        else {
            //ask the user if he wishes to delete the item
            this.deleteItem(item);
        }
    };

    //when the user blurs the edit mode or press enter on a phone number
    MainCtrl.prototype.editPhoneNumber = function(newNum,index){
        if (newNum != "") {
            this.currentItem.changePhoneNum(newNum, index);
            this.data.save();
        }
        else {
            //if the user submited a blank string then its probbely a mistake or that he wishes to delete the item
            //    todo ask the user if he wishes to delete the item if not do nothing
            this.deletePhoneNum(index);
        }
    };

    MainCtrl.prototype.deletePhoneNum = function(index){

        $('#delete-modal').openModal();
        var self = this;
        $('#delete-confirm').one('click',function(){
            self.currentItem.deletePhoneNum(index);
            var content = '<i class="material-icons small red-text">delete</i><span>the phone number was deleted </span>';
            Materialize.toast(content, 4000);
            self.data.save();
            self.$scope.$apply();
        });
    };

    MainCtrl.prototype.deleteItem = function(item){
        var self = this;
        var item = item || self.currentItem;
        $('#delete-modal').openModal();

        $('#delete-confirm').one('click',function(){
            var content = '<i class="material-icons small red-text">delete</i><span>the item was deleted </span>';
            Materialize.toast(content, 4000);
            var parent = item.parent;
            self.phoneBook.deleteItem(item.id, function(){
                self.data.save();
                self.currentItem = parent;
                self.$scope.$digest();
            });

        });
    };

    MainCtrl.prototype.hideForm = function (){
        this.$scope.$broadcast ('hideAllForms');
    };

    angular
        .module('app')
        .controller('MainCtrl',['phoneBookService','$scope','dataService',MainCtrl]);
})();
