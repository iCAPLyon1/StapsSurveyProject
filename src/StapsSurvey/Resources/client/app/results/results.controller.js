(function() {
    'use strict';
    angular
        .module('app.results')
        .controller('Results', Results);

    Results.$inject = ['dataservice', 'translations', '_'];

    function Results(dataservice, translations, _) {
        /*jshint validthis: true */
        var vm = this;
        vm.questions = {};
        vm.chartData = {};
        vm.result = null;
        vm.chartData.colours = [
            { // dark grey
                fillColor: "transparent",
                strokeColor: "rgba(200,200,200,1)",
                pointColor: "rgba(200,200,200,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(200,200,200,0.8)"
            },
            { // blue
                fillColor: "rgba(0,140,186,0.2)",
                strokeColor: "rgba(0,140,186,1)",
                pointColor: "rgba(0,140,186,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,140,186,0.8)"
            }
        ];
        vm.chartData.options = {

        };
        vm.title = translations.results;
        vm.paneltitle = translations.results_title;
        vm.introtext = translations.results_intro;
        vm.explaintext = translations.results_explain;
        vm.exportPdf = exportPdf;
        vm.saveAsPng = saveAsPng;

        activate();
        function activate() {
            // Using a resolver on all routes or dataservice.ready in every controller
            // var promises = [getQuiz()];
            // return dataservice.ready(promises).then(function(){
            return getQuestions().then(calculateScores);
        }

        function getQuestions() {
            return dataservice.getDataForScoring().then(function(data) {
                vm.questions = data.questions;
                vm.result = data.result;

                return vm.questions;
            });
        }

        function calculateScores() {
            var questions = vm.questions;

            //Calculate scores for radar graph and messages
            var data = [], scores = [], labels = [], messages = [];
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                var questionScore = 0;
                var userFilter = _.isUndefined(question.userFilter)?null:question.userFilter;
                for (var j = 0; j < question.sections.length; j++) {
                    var section = question.sections[j];
                    if (section.isActive == true) {
                        var sectionScore = 0;
                        for (var k = 0; k < section.subQuestions.length; k++) {
                            var subQuestion = section.subQuestions[k];
                            if (subQuestion.isActive == true) {
                                sectionScore += (_.isUndefined(subQuestion.userAnswer) || _.isNull(subQuestion.userAnswer))?0:parseInt(subQuestion.userAnswer);
                            }
                        }
                        sectionScore = sectionScore/parseInt(section.base);
                        questionScore += sectionScore;
                    }
                }
                if (userFilter!=null && !_.isUndefined(userFilter.coefficient)) {
                    questionScore = questionScore*parseFloat(userFilter.coefficient);
                }
                if (!_.isUndefined(question.result) && !_.isNull(question.result)) {
                    for (var l = 0; l<question.result.rules.length; l++) {
                        var rule = question.result.rules[l];
                        if (eval(questionScore+rule['@condition'])) {
                            messages.push({'name':question.title+" ("+translations.axis+" "+question.id.toUpperCase()+")", 'text':rule.message});
                        }
                    }
                }
                //Push results to arrays
                labels.push(question.id.toUpperCase());
                data.push(1);
                //meanvalues.push(0.5);
                scores.push(questionScore);
            }
            vm.chartData.labels = labels;
            vm.chartData.data = [data, scores];
            vm.chartData.messages = messages;

            //Show score messages depending on scores
            if (!_.isUndefined(vm.result) && !_.isNull(vm.result)) {
                for (var i = 0; i<vm.result.rules.length; i++) {
                    var rule = vm.result.rules[i];
                    var filtered = _.filter(scores, function(score){return eval(score+rule['@condition'])});
                    if (!_.isArray(rule.message)) {
                        if (checkCondition(rule.message['@min'], rule.message['@max'], scores, filtered)) {
                            vm.explaintext = rule.message.text;

                            break;
                        }
                    } else {
                        for (var j = 0; j < rule.message.length; j++) {
                            var message = rule.message[j];
                            if (checkCondition(message['@min'], message['@max'], scores, filtered)) {
                                vm.explaintext = message.text;

                                break;
                            }
                        }
                    }
                }
            }
        }

        function checkCondition (min, max, scores, filtered) {
            if(_.isUndefined(max) && (_.isUndefined(min) || min=='all') ) return scores.length == filtered.length;
            else if (_.isUndefined(max) && !_.isUndefined(min)) return filtered.length>parseInt(min);
            else if (!_.isUndefined(max) && _.isUndefined(min)) return filtered.length<=parseInt(max);
            else return filtered.length
        }

        function exportPdf (canvasId) {
            var pdf = new jsPDF('p', 'cm');
            var radarPng = document.getElementById(canvasId).toDataURL();

            pdf.setFontSize(12);
            var lines = pdf.splitTextToSize(translations.succeed_in_staps, 19);
            pdf.text(1, 2, lines);
            var introtext = $('<p>'+vm.introtext+'</p>').text();
            lines = pdf.splitTextToSize(introtext, 19);
            pdf.text(1, 3, lines);
            pdf.addImage(radarPng, 'PNG', -4, 4);


            lines = pdf.splitTextToSize(vm.explaintext, 19);
            pdf.text(1, 20, lines);
            var startFrom = 20 + lines.length*0.5 + 0.5;
            for (var i = 0; i < vm.chartData.messages.length; i++) {
                var message = vm.chartData.messages[i];
                pdf.setFontType("bold");
                lines = pdf.splitTextToSize(message.text, 19);
                var nextStartFrom = startFrom + lines.length*0.5 + 1;
                if (nextStartFrom > 28) {
                    pdf.addPage();
                    startFrom = 2;
                    nextStartFrom = startFrom + lines.length*0.5 + 1;
                }
                pdf.text(1, startFrom, message.name);
                pdf.setFontType("normal");
                pdf.text(1, startFrom + 0.5, lines);
                startFrom = nextStartFrom;
            }
            pdf.save(translations.results+".pdf");
        }

        function saveAsPng (linkId, canvasId) {
            var link = document.getElementById(linkId);
            link.href = document.getElementById(canvasId).toDataURL();
            link.download = translations.results+".png";
        }
    }
})();