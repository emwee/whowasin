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

// comment

$app->notFound(function() use ($app) {
	
  	$app->render('404.mustache');
});

$app->get('/home', function() use ($app) {
	
	$app->render('home.mustache');
});

$app->get('/suggestions', function() use ($app, $redis, $movie_search) {
	
	if (isset($_GET['q'])) {
		
		$search_term = $_GET['q'];
		
		$movie_search->setSearchTerm($search_term);
		
		$suggestions = $movie_search->getSuggestions($search_term);
		
		if ($app->request()->isAjax() || 1) {
			$app->contentType('application/json');
			echo json_encode($suggestions, true);
			die();
		}
	}
});

$app->get('/find', function() use ($app, $redis, $movie_search) {
	
	if (isset($_GET['imdb_ids'])) {
		
		$imdb_ids = $_GET['imdb_ids'];

		foreach ($imdb_ids as $imdb_id) {
			$movie_search->setImdbId($imdb_id);
		}
		
		$matches = $movie_search->findCommon();
		
		if ($app->request()->isAjax() || 1) {
			$app->contentType('application/json');
			echo json_encode($matches, true);
			die();
		}
	}
});

$app->run();