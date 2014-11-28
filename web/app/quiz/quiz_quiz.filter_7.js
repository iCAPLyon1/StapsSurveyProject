(function() {
    'use strict';
    angular.module('app.quiz')
        .filter('isInOption', isInOption);

    isInOption.$inject = ['_']
    function isInOption (_) {
        return applyFilter;

        function applyFilter (items, filter) {
            var filteredItems = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (_.isNull(filter) || _.isUndefined(item['@filter'])) {
                    item.isActive = true;
                    filteredItems.push(item);
                } else {
                    var itemFilterArray = item['@filter'].split(',');
                    item.isActive = false;
                    if (_.indexOf(itemFilterArray, filter.value)>-1) {
                        item.isActive = true;
                        filteredItems.push(item);
                    }
                }
            }

            return filteredItems;
        }
    }
})();