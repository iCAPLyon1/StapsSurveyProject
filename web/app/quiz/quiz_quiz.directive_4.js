(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspQuiz', sspQuiz);

    function sspQuiz () {
        var directive = {
            restrict: 'E',
            controller: sspQuizController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                quiz: '=',
                options: '='
            },
            templateUrl: 'partials/quiz.html',
            replace: true
        };

        return directive;

        function sspQuizController() {
            var vm = this;

        }
    }
})();