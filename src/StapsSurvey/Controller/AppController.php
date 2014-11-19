<?php

namespace StapsSurvey\Controller;

use Symfony\Component\HttpFoundation\Response;
use StapsSurvey\Libs\XML2Array;

class AppController extends AbstractController
{
	public function indexAction() {
		return $this->app['twig']->render('index.html.twig');
	}
	
	public function surveyAction($page) {
        $quiz = null;
        if(file_exists(__DIR__.'/../Model/survey.xml')){
            $quiz = simplexml_load_file(__DIR__.'/../Model/survey.xml');
            $quiz = XML2Array::parse($quiz, array("filter"));
        }

		return $this->app['twig']->render('page.html.twig',array('page'=>$page, 'quiz'=>$quiz));
	}
}