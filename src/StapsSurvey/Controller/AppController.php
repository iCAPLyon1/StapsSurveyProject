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
	
	public function quizAction($page)
    {
        $quiz = null;
        $quizPath = __DIR__.'/../Model/quiz.xml';
        if(file_exists($quizPath)){
            $quiz = simplexml_load_file($quizPath);
            $quiz = XML2Array::parse($quiz, array("filter"));
        }

		return $this->app['twig']->render('page.html.twig',array('page'=>$page, 'quiz'=>$quiz));
	}

    public function resultsAction()
    {
        return $this->app['twig']->render('results.html.twig');
    }
}