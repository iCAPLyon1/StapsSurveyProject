(function () {
    'use strict';
    angular.module('app.layout')
        .run(stepprogressbarTemplate);

    stepprogressbarTemplate.$inject = ['$templateCache'];

    function stepprogressbarTemplate ($templateCache) {
        var tplHtml = ''+
            '<ul id="stepprogressbar">'+
                '<li class="stepprogressbar-step" ng-style="{\'width\':(100/vm.pages)+\'%\'}" data-ng-class="{\'active\':vm.page>=($index+1)}" data-ng-repeat="title in vm.titles" data-ng-bind-html="::title"></li>' +
            '</ul>';

        $templateCache.put(
            'partials/stepprogressbar.html',
            tplHtml
        );
    }
})();