(function() {
    'use strict';
    angular.module('app.quiz')
        .filter('isInOption', isInOption);

    isInOption.$inject = ['_']
    function isInOption (_) {
        return applyFilter;

        function applyFilter (items, filter) {
            var filteredItems = [];
            if (_.isNull(filter)) {
                filteredItems = items;
            } else {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (_.isUndefined(item['@filter'])) {
                        filteredItems.push(item);
                    } else {
                        var itemFilterArray = item['@filter'].split(',');
                        if (_.indexOf(itemFilterArray, filter.id)>-1) {
                            filteredItems.push(item);
                        }
                    }
                }
            }

            return filteredItems;
        }
    }
})();