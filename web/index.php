<?php

require_once __DIR__.'/../vendor/autoload.php'; 

use Silex\Application;


$app = new Application(); 

require __DIR__.'/../app/config/prod.php';
require __DIR__.'/../app/app.php';

$app->run();
//Replace with this when prod: $app['http_cache']->run(); 