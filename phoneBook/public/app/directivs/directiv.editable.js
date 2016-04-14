(function(){
    "use strict";
    //
    //this directive gets an update function to invoke with the freshly edited string
    //optionaly you can add a "second-arg" attr with the value set to $index or a unike-id or the obj itself wich was edited
    //and it will be sent as second argument to the invoked function wich can be used as a to the edited item
    //
    function editable(){
        return {
            restrict: 'A',
            scope:{
                updateFunction: '&editable'
            },
            link : function(scope, element, attrs) {
                element.attr("contenteditable","true");

                element.on('blur',function(){
                    //geting the freshly edited text
                    var newText = element.context.textContent;
                    //this var cold be index id or the object your editing itself and
                    // it will be sent to the function you refrenced as a 2 argument
                    var secondArg = attrs.secondArg;
                    scope.updateFunction({text:newText,secondArg:secondArg});
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
        .directive('editable',editable)
})();