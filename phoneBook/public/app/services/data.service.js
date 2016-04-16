(function(){
    function dataService($http,phoneBookService){

        function save (){
            var data = JSON.stringify( phoneBookService.toJsonArray() );

            console.log('test',data);
            $http({
                method:'POST',
                url:'/phone-book',
                data: data
            }).then(function(res){
                console.log(res);
            },function(err){
                console.log(err);
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