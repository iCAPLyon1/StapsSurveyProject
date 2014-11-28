<?php

use Silex\Provider\HttpCacheServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\MonologServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\TwigServiceProvider;
use SilexAssetic\AsseticServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\TranslationServiceProvider;
use Symfony\Component\Translation\Loader\YamlFileLoader;

// Enable for debug cache profiler
//use Silex\Provider\WebProfilerServiceProvider;
//use Silex\Provider\ServiceControllerServiceProvider;

// Registering providers for various functionalities
$app->register(new HttpCacheServiceProvider());
$app->register(new SessionServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new FormServiceProvider());
$app->register(new UrlGeneratorServiceProvider());

// Translator
$app->register(new TranslationServiceProvider());
$app['translator'] = $app->share($app->extend('translator', function ($translator, $app) {
	$translator->addLoader('yaml', new YamlFileLoader());
	$translator->addResource('yaml', __DIR__.'/../src/StapsSurvey/Resources/translations/home.fr.yml', 'fr');
	
	return $translator;
}));

// Logger
$app->register(new MonologServiceProvider(), array(
	'monolog.logfile' => __DIR__.'/log/app.log',
	'monolog.name' => 'app',
	'monolog.level' => 300 // = Logger::WARNING
));

// Twig views
$app->register(new TwigServiceProvider(), array(
	'twig.options' => array(
		'cache' => isset($app['twig.options.cache']) ? $app['twig.options.cache'] : false,
		'strict_variables' => true
	),
	'twig.form.templates' => array('form_div_layout.html.twig'),
	'twig.path' => array(__DIR__ . '/../src/StapsSurvey/Resources/views')
));

// Debug cache
/*if ($app['debug'] && isset($app['cache.path'])) {
	$app->register(new ServiceControllerServiceProvider());
	$app->register(new WebProfilerServiceProvider(), array(
		'profiler.cache_dir' => $app['cache.path'].'/profiler',
	));
}*/

// Assetic filters
if (isset($app['assetic.enabled']) && $app['assetic.enabled']) {
	$app->register(new AsseticServiceProvider(), array(
		'assetic.options' => array(
			'debug' => $app['debug'],
			'auto_dump_assets' => $app['debug'],
		)
	));
	
	$app['assetic.filter_manager'] = $app->share(
		$app->extend('assetic.filter_manager', function ($fm, $app) {
			$fm->set('lessphp', new Assetic\Filter\LessphpFilter());
			$fm->set('cssmin', new Assetic\Filter\CssMinFilter());
			$fm->set('jsmin', new Assetic\Filter\JSMinFilter());
		
			return $fm;
		})
	);
	
	// Do we want to dump all our assets? Only if in debug mode!
	if ($app['assetic.options']['auto_dump_assets']){
		$dumper = $app['assetic.dumper'];
		if (isset($app['twig'])) {
			$dumper->addTwigAssets();
		}
		$dumper->dumpAssets();
	}
}