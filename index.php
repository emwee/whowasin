<?php

error_reporting(E_ALL);

function dump($obj) {
	echo '<pre>';
	var_dump($obj);
	echo '</pre>';
}

require 'vendor/autoload.php';

require 'classes/class.MovieSearch.php';
require 'classes/class.ImdbSearch.php';
require 'classes/class.MustacheView.php';

$redis = new Predis\Client('tcp://localhost:6379');

$movie_search = new MovieSearch($redis);


$app = new \Slim\Slim(array(
	'view' => new MustacheView()
));

$app->notFound(function() use ($app) {
	
  	$app->render('404.mustache');
});

$app->get('/home', function() use ($app) {
	
	$app->render('home.mustache');
});

$app->get('/search', function() use ($app, $redis, $movie_search) {
	
	if (isset($_GET['movies'])) {
		
		$search_terms = $_GET['movies'];
		
		foreach ($search_terms as $search_term) {
			$movie_search->setSearchTerm($search_term);
		}
		
		$matches = $movie_search->getCommonActors();
		
		if ($app->request()->isAjax()) {
			$app->contentType('application/json');
			echo json_encode($movie_search->json(), true);
			die();
		}
	}
});

$app->run();