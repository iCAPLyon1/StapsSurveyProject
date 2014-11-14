<?php

use StapsSurvey\Controller\ControllerResolver;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Routing\Loader\YamlFileLoader;
use Symfony\Component\Routing\RouteCollection;
use Silex\Application;

// Change controller resolver to our resolver
$app['resolver'] = $app->share(function () use ($app) {
	return new ControllerResolver($app);
});

// Local
$app['locale'] = 'fr';
$app['session.default_locale'] = $app['locale'];
$app['translator.messages'] = array(
	'fr' => __DIR__.'/../../src/StapsSurvey/Resources/locales/fr.yml',
);

// Cache
$app['cache.path'] = __DIR__ . '/../cache';

// Http cache
$app['http_cache.cache_dir'] = $app['cache.path'] . '/http';

// Twig cache
$app['twig.options.cache'] = $app['cache.path'] . '/twig';

// Routes
$app['routes'] = $app->extend('routes', function (RouteCollection $routes, Application $app) {
    $loader     = new YamlFileLoader(new FileLocator(__DIR__ . '/routing'));
    $collection = $loader->load('routes.yml');
    $routes->addCollection($collection);
 
    return $routes;
});

// Assetic
$app['assetic.enabled'] = true;
$app['assetic.path_to_cache'] = $app['cache.path'] . '/assetic' ;
$app['assetic.path_to_web'] = __DIR__ . '/../../web/assets';
$app['assetic.input.path_to_assets'] = __DIR__ . '/../../src/StapsSurvey/Resources/assets';
$app['assetic.input.path_to_css'] = $app['assetic.input.path_to_assets'] . '/less/';
$app['assetic.output.path_to_css'] = 'css/';
$app['assetic.input.path_to_js'] = $app['assetic.input.path_to_assets'] . '/app/';
$app['assetic.output.path_to_js'] = 'js/';