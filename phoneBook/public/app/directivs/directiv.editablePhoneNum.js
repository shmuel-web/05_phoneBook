(function(){
    "use strict";
    function editablePhoneNum (){
        return {
            restrict: 'A',
            link : function(scope, element,atrrs) {
                element.attr("contenteditable","true");

                element.on('blur',function(){
                    //geting the freshly edited text
                    var newNum = element.context.textContent;
                    var index = atrrs.editablePhoneNum;
                    scope.ctrl.editPhoneNumber(newNum, index);
                }).on('keypress',function(event){
                    if (event.which === 13){
                        event.preventDefault();
                        element.blur();
                    }
                })
            }
        }
    }

    angular
        .module('app')
        .directive('editablePhoneNum',editablePhoneNum)
})();