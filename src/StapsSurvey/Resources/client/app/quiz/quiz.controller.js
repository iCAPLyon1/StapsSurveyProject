(function() {
    'use strict';
    angular
        .module('app.quiz')
        .controller('Quiz', Quiz);

    Quiz.$inject = ['dataservice', '$routeParams'];

    function Quiz(dataservice, $routeParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.quiz = {};
        vm.title = '';
        vm.page = $routeParams['page']?parseInt($routeParams['page']):1;
        vm.pages = vm.page;

        activate();

        function activate() {
            // Using a resolver on all routes or dataservice.ready in every controller
            // var promises = [getQuiz()];
            // return dataservice.ready(promises).then(function(){
            return getQuiz().then(function() {
                console.log('Activated Quiz View: '+vm.title);
            });
        }

        function getQuiz() {
            return dataservice.getSubQuiz(vm.page).then(function(data) {
                vm.quiz = data;
                vm.title = data.title;

                return vm.quiz;
            });
        }
    }
})();