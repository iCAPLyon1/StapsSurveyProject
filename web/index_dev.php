<?php

require_once __DIR__.'/../vendor/autoload.php';
use Silex\Application;
use Symfony\Component\Debug\Debug;

Debug::enable();

$app = new Application();
$dir = __DIR__;
require __DIR__.'/../app/config/dev.php';
require __DIR__.'/../app/app.php';
//require __DIR__.'/../src/controllers.php';

$app->run();