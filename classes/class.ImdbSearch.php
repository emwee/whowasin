<?php

class ImdbSearch {

	public function __construct() {
		
		$this->base_url = "http://imdbapi.org/";
		
		$this->default_params = array(
			'type' => 'json',
			'limit' => 5,
			'yg' => 0,
			'lang' => 'en-US',
			'aka' => 'simple',
			'release' => 'simple',
		);
	}
	
	public function query($title) {
		
		$params = array_merge($this->default_params, array('title' => $title));
		
		$query_string = '';
		
		foreach ($params as $field => $value) { 
			$query_string .= (strlen($query_string) < 1) ? '?' : '&'; 
			$query_string .= $field . '=' . rawurlencode($value); 
		}

		$url = $this->base_url . $query_string;

		$response = file_get_contents($url);
		
		return $response;	
	}	
}