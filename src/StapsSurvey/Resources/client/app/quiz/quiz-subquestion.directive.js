(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspSubQuestion', sspSubQuestion);

    function sspSubQuestion () {
        var directive = {
            restrict: 'E',
            controller: sspSubQuestionController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                subquestion: '=',
                options: '='
            },
            templateUrl: 'partials/subquestion.html',
            replace: true
        };

        sspSubQuestionController.$inject = ['_', 'quiz.json'];

        return directive;

        function sspSubQuestionController(_, quiz) {
            var vm = this;
            if(_.isUndefined(vm.subquestion.userAnswer))vm.subquestion.userAnswer = null;
            vm.choiceChanged = choiceChanged;
            vm.choiceValue = (_.isNull(vm.subquestion.userAnswer))?null:vm.subquestion.userAnswer.toString();
            vm.colNum = Math.floor(12/vm.subquestion.answers.length);

            function choiceChanged (newValue) {
                vm.choiceValue = newValue;
                vm.subquestion.userAnswer = parseInt(newValue);
            }
        }
    }
})();