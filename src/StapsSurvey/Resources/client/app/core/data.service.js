(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'quiz.json'];
    function dataservice($http, $location, $q, quiz) {
        var isPrimed = false;
        var primePromise;
        var service = {
            getSubQuiz: getSubQuiz,
            getQuizPagesCount: getQuizPagesCount,
            ready: ready
        };

        return service;

        function getQuizPagesCount() {
            var count = quiz['subQuizzes'].length;

            return $q.when(count);
        }

        function getSubQuiz(page) {
            var subQuiz = quiz['subQuizzes'][page];
            subQuiz.page = page;
            subQuiz.pages = quiz['subQuizzes'].length;

            return $q.when(subQuiz);
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
                .catch(console.log('"ready" function failed'));
        }
   }
})();