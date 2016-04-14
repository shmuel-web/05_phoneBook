(function(){
    angular.module('app',['ngAnimate']);
    $('.modal-trigger').leanModal();//intialize the modal ui widget

    //extends jquery to play wall with animate.css libary
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd ';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
})();

