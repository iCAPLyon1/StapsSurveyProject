(function () {
    'use strict';
    angular.module('app.results')
        .run(resultsTemplate);

    resultsTemplate.$inject = ['$templateCache'];

    function resultsTemplate ($templateCache) {
        var tplHtml = ''+
            '<h3 class="sub-quiz-title">{{::vm.title}}</h3>'+
            '<div class="ssp-quiz-results panel panel-default">'+
                '<div class="panel-heading"><h3 class="ssp-quiz-results-title panel-title" data-ng-bind-html="::vm.paneltitle"></h3></div>'+
                '<div class="ssp-quiz-results-body panel-body">' +
                    '<div class="ssp-quiz-results-buttons">' +
                        '<button class="btn btn-primary pull-right" data-ng-click="vm.exportPdf(\'radar\')"><i class="fa fa-file-pdf-o"></i> Enregistrer en pdf</button>' +
                        '<a id="ssq-quiz-graph-to-png-link" class="btn btn-default pull-right" data-ng-click="vm.saveAsPng(\'ssq-quiz-graph-to-png-link\', \'radar\')"><i class="fa fa-file-image-o"></i> Enregistrer en image </a>' +
                        '<div class="clearfix"></div>'+
                    '</div>'+
                    '<div class="ssp-quiz-results-info text-center" data-ng-bind-html="::vm.introtext"></div>'+
                    '<div class="ssp-quiz-results-graph">' +
                        '<canvas id="radar" class="chart chart-radar" data="vm.chartData.data" colours="vm.chartData.colours" options="vm.chartData.options" labels="vm.chartData.labels"></canvas>'+
                    '</div>'+
                    '<div class="ssp-quiz-results-explain text-center" data-ng-bind-html="::vm.explaintext"></div>'+
                    '<div class="ssq-quiz-results-question-message" data-ng-repeat="message in vm.chartData.messages">'+
                        '<h4><ins data-ng-bind-html="::message.name"></ins></h4>'+
                        '<p data-ng-bind-html="::message.text"></p>'+
                    '</div>' +
                    '<div class="ssp-quiz-results-buttons text-center">' +
                        '<a class="btn btn-primary" href="/quiz">Refaire le test</a>' +
                    '</div>'+
                '</div>'+
            '</div>';

        $templateCache.put(
            'partials/results.html',
            tplHtml
        );
    }
})();