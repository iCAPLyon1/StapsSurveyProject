(function () {
    'use strict';
    angular.module('app.quiz')
        .run(quizTemplate);

    quizTemplate.$inject = ['$templateCache'];

    function quizTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-quiz">'+
                '<h3 data-ng-bind-html="::vm.quiz.title"></h3>'+
                '<ssp-question question="question" data-ng-repeat="question in vm.quiz.questions" options="vm.options"></ssp-question>'+
                '<div class="ssp-quiz-pagination">'+
                    '<a class="btn btn-default" href="#/{{vm.quiz.page-1}}" data-ng-class="{\'disabled\':vm.quiz.page<=1}"><i class="fa fa-angle-left"></i> Precedent</a>'+
                    '<a class="btn btn-primary pull-right" href="#/results" data-ng-if="vm.quiz.page>=vm.quiz.pages">Terminer</a>'+
                    '<a class="btn btn-default pull-right" href="#/{{vm.quiz.page+1}}" data-ng-class="{disabled:vm.quiz.page>=vm.quiz.pages}">Suivant <i class="fa fa-angle-right"></i></a>'+
                '</div>'+
            '</div>';

        $templateCache.put(
            'partials/quiz.html',
            tplHtml
        );
    }
})();

