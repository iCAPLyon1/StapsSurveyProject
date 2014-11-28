(function() {
    'use strict';
    angular.module('app.core', [
        'ngRoute',
        'blocks.router',
        'underscore'
    ]);
})();
(function() {
    'use strict';
    var core = angular.module('app.core');

    core.config(configure);

    configure.$inject=['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'quiz.json'];
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, quiz) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = quiz.title;
        var resolveAlways = {
            ready: resolveAlwaysReady
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        //////////////////////////////////////
        resolveAlwaysReady.$inject = ['dataservice', '$timeout'];

        function resolveAlwaysReady (dataservice, $timeout) {
            //return $timeout(dataservice.ready, 0, false);

            return dataservice.ready();
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', 'quiz.json', '_'];
    function dataservice($q, quiz, _) {
        var isPrimed = false;
        var primePromise;
        var service = {
            getSubQuiz: getSubQuiz,
            getQuizPagesCount: getQuizPagesCount,
            getProgressBarData: getProgressBarData,
            getDataForScoring: getDataForScoring,
            ready: ready
        };

        return service;

        function getQuizPagesCount() {
            var count = quiz['subQuizzes'].length;

            return $q.when(count);
        }

        function getProgressBarData() {
            var result = {};
            result.pages = quiz['subQuizzes'].length;
            result.titles = _.pluck(quiz['subQuizzes'], 'title');

            return $q.when(result);
        }

        function getSubQuiz(page) {
            var maxPages = quiz['subQuizzes'].length;
            page = Math.min(Math.max(page, 1), maxPages);
            var subQuiz = quiz['subQuizzes'][page-1];
            subQuiz.page = page;
            subQuiz.pages = quiz['subQuizzes'].length;

            return $q.when(subQuiz);
        }

        function getDataForScoring() {
            var questions = [];
            for(var i = 0; i < quiz['subQuizzes'].length; i++) {
                var subQuiz = quiz['subQuizzes'][i];
                questions = questions.concat(subQuiz.questions);
            }
            var result = quiz.result;
            return $q.when({'questions':questions, 'result': result});
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }
            primePromise = $q.when(true).then(success);
            return primePromise;
            function success() {
                isPrimed = true;
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(function() { console.log('"ready" function failed') });
        }
   }
})();