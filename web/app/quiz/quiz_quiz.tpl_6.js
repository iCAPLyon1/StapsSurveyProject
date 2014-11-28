(function () {
    'use strict';
    angular.module('app.quiz')
        .run(quizTemplate);

    quizTemplate.$inject = ['$templateCache'];

    function quizTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-quiz">'+
                '<h3>{{::vm.quiz.title}}</h3>'+
                '<div class="panel panel-default ssp-question" data-ng-repeat="question in vm.quiz.questions">'+
                    '<ssp-question question="question" options="vm.options"></ssp-question>'+
                '</div>'
        '</div>';

        $templateCache.put(
            'partials/quiz.html',
            tplHtml
        );
    }
})();

