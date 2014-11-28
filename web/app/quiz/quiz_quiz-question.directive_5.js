(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspQuestion', sspQuestion);

    function sspQuestion () {
        var directive = {
            restrict: 'E',
            controller: sspQuestionController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                question: '=',
                options: '='
            },
            templateUrl: 'partials/question.html',
            replace: true
        };

        sspQuestionController.$inject = ['_'];

        return directive;

        function sspQuestionController(_) {
            var vm = this;
            vm.hasFilter = !_.isUndefined(vm.question.filter)&&!_.isNull(vm.question.filter);
            if (vm.hasFilter) {
                vm.question.userFilter = _.isUndefined(vm.question.userFilter)?vm.question.filter.options[0]:vm.question.userFilter;
            } else {
                vm.question.userFilter = null;
            }
        }
    }
})();