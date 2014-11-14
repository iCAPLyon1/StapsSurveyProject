<?php

namespace StapsSurvey\Controller;

use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
	public function indexAction() {
		return new Response("This is my index page!!!");
	}
	
	public function surveyAction($page) {
		return new Response("This is my survey page: ".$page);
	}
}