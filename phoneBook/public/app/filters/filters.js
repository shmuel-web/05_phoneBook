(function(){
    angular.module('app')
        //this filter orders the child items by groups by abc then contacts by abc
        .filter('groupsFirstByABC', function () {
            return function (items){
                var groups = [];
                var contacts = [];

                function sortABC (items){
                    items.sort (function(a, b){
                        var str1 = a.fName + a.lName || a.name;
                        var str2 = b.fName + b.lName || b.name;
                        if (str1 > str2) return 1;
                        if (str1 < str2) return -1;
                        return 0;
                    });
                    return items;
                }

                for (var i = 0; i < items.length; i++ ){
                    var item = items[i];
                    if (item.name){
                        groups.push(item);
                        groups = sortABC(groups);
                    }

                    else {
                        contacts.push(item);
                        contacts = sortABC(contacts);
                    }
                }
                return groups.concat(contacts);
            }
        })
        //revese the order of an array
        .filter('reverse',function(){
            return function(items) {
                return items.slice().reverse();
            };
        })

})();