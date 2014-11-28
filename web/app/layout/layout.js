(function() {
    'use strict';
    angular.module('app.layout', []);
})();
(function(){
    'use strict';

    angular.module('app.layout')
        .directive('stepProgressBar', stepProgressBar);

    function stepProgressBar () {
        var directive = {
            restrict: 'E',
            controller: stepProgressBarController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                page: '='
            },
            templateUrl: 'partials/stepprogressbar.html',
            replace: true
        };

        stepProgressBarController.$inject = ['dataservice', 'translations'];

        return directive;

        function stepProgressBarController(dataservice, translations) {
            var vm = this;
            vm.page = parseInt(vm.page);

            activate();
            function activate() {
                // Using a resolver on all routes or dataservice.ready in every controller
                // var promises = [getQuiz()];
                // return dataservice.ready(promises).then(function(){
                return getProgressBarData().then(function() {});
            }

            function getProgressBarData() {
                return dataservice.getProgressBarData().then(function(data) {
                    vm.pages = data.pages+1;
                    vm.titles = data.titles;
                    vm.titles.push(translations.results);

                    return vm.quiz;
                });
            }
        }
    }
})();
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