(function(){

    function autoFocus($timeout){
        return {
            restrict: 'A',
            link : function($scope, $element) {
                $timeout(function(){
                    $element[0].focus();
                },300);

            }
        }
    }

    angular
        .module('app')
        .directive('autoFocus',['$timeout',autoFocus])
})();