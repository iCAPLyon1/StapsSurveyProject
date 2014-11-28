(function () {
    'use strict';
    angular.module('app.quiz')
        .run(questionTemplate);

    questionTemplate.$inject = ['$templateCache'];

    function questionTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-question panel panel-default">'+
                '<div class="panel-heading"><h3 class="ssp-question-title panel-title" data-ng-bind-html="::vm.question.title"></h3></div>'+
                '<div class="ssp-question-body panel-body">'+
                    '<div data-ng-if="vm.hasFilter">'+
                        '<span data-ng-bind-html="::vm.question.filter.title"></span> '+
                        '<select data-ng-if="vm.hasFilter" data-ng-model="vm.question.userFilter" data-ng-options="option.title for option in vm.question.filter.options">'+
                        '</select>'+
                    '</div>'+
                    '<div class="ssp-question-section" data-ng-repeat="section in vm.question.sections | isInOption:vm.question.userFilter">'+
                        '<h4 class="ssp-question-section-title" data-ng-bind-html="::section.title"></h4>'+
                        '<div class="ssp-question-section-subquestions">'+
                            '<div class="ssp-question-section-subquestion" data-ng-repeat="subquestion in section.subQuestions | isInOption:vm.question.userFilter">'+
                                '<ssp-sub-question subquestion="subquestion" options="vm.options"></ssp-sub-question>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
        '</div>';

        $templateCache.put(
            'partials/question.html',
            tplHtml
        );
    }
})();