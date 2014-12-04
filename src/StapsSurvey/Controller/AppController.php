<?php

namespace StapsSurvey\Controller;

use Symfony\Component\HttpFoundation\Response;
use StapsSurvey\Libs\XML2Array;

class AppController extends AbstractController
{
	public function indexAction()
    {
		return $this->app['twig']->render('index.html.twig');
	}
	
	public function quizAction()
    {
        $quiz = null;
        $quizPath = __DIR__.'/../Model/quiz.xml';
        if(file_exists($quizPath)){
            $quiz = simplexml_load_file($quizPath);
            $quiz = XML2Array::parse($quiz, array("filter", "result", "message"));
        }

		return $this->app['twig']->render('page.html.twig',array('quiz'=>$quiz));
	}
}