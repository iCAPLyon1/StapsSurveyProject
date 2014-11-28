(function () {
    'use strict';
    angular.module('app.quiz')
        .run(questionTemplate);

    questionTemplate.$inject = ['$templateCache'];

    function questionTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-question">'+
                '<h3 class="ssp-question-title">{{::vm.question.title}}</h3>'+
                '<div class="ssp-question-body">'+
                    '<select data-ng-if="vm.hasFilter" ng-model="vm.currentFilter" ng-options="option.title for option in vm.question.filter.options">'+
                        '<option value="">----</option>'+
                    '</select>'+
                    '<div class="ssp-question-section" ng-repeat="section in vm.question.sections | isInOption:vm.currentFilter">'+
                        '<h5 class="ssp-question-section-title">{{::section.title}}</h5>'+
                    '</div>'+
                '</div>'+
        '</div>';

        $templateCache.put(
            'partials/question.html',
            tplHtml
        );
    }
})();