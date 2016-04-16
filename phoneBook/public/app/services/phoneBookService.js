(function(){
    function phoneBookService($http){

        var phoneBook = new BL.PhoneBook;
        $http({
            method:'GET',
            url:'/phone-book'
        }).then(function(res){
            phoneBook.readPhoneBook(res.data);
        },function(err){
            console.log(err);
        });
        return phoneBook;
    }

    angular
        .module('app')
        .factory('phoneBookService',['$http',phoneBookService]);
})();
