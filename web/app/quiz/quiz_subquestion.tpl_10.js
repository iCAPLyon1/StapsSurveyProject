(function () {
    'use strict';
    angular.module('app.quiz')
        .run(subquestionTemplate);

    subquestionTemplate.$inject = ['$templateCache'];

    function subquestionTemplate ($templateCache) {
        var tplHtml = ''+
                '<div class="row">'+
                    '<div class="ssp-sub-question-title col-md-6" data-ng-bind-html="::vm.subquestion.title"></div>'+
                    '<div class="ssp-sub-question-answers col-md-6">'+
                        '<div class="ssp-sub-question-answer col-xs-{{::vm.colNum}}" data-ng-class="{\'choice-selected\':vm.choiceValue==answer.value}" data-ng-repeat="answer in vm.subquestion.answers" data-ng-click="vm.choiceChanged(answer.value)">'+
                            '<span data-ng-bind-html="::answer.title"></span>'+
                        '</div>'+
                    '</div>' +
                '</div>';

        $templateCache.put(
            'partials/subquestion.html',
            tplHtml
        );
    }
})();