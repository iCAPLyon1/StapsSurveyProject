(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspQuestion', sspQuiz);

    function sspQuiz () {
        var directive = {
            restrict: 'E',
            controller: sspQuizController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                question: '=',
                options: '='
            },
            templateUrl: 'app/quiz/partials/question.html',
            replace: true
        };

        return directive;

        function sspQuizController() {
            var vm = this;
            vm.hasFilter = hasFilter;

            function hasFilter () {
                return
            }
        }
    }
})();