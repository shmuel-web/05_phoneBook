(function(){
    function dataService($http,phoneBookService){

        function save (){
            var data = JSON.stringify( phoneBookService.toJsonArray() );
            $http({
                method:'POST',
                url:'/phone-book',
                data: data
            }).then(function(res){

            },function(err){
                throw(err);
            });
        }

        return {
            save:save
        }
    }

    angular
        .module('app')
        .factory('dataService',['$http','phoneBookService',dataService]);
})();