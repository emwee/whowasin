<?php

class MovieSearch {
	
	private $responseedis;
	
	public function __construct(&$responseedis) {
		$this->redis = $responseedis;
		$this->query = array();
		$this->results = array();
		$this->query_imdb_entries = array();
		$this->matches = array();
	}
	
	public function setSearchTerm($search_term) {
		array_push($this->query, $search_term);
	}
	
	public function getImdbEntries() {
		
		foreach ($this->query as $search_term) {
			
			// store result for this search term
			$this->results[$search_term] = $this->getImdbEntryBySearchTerm($search_term);
		}
		
		if (!array_key_exists('error', $this->results)) {
			return $this->results;
		}
		
		// return $responseesults; ?
	}
	
	private function getImdbEntriesBySearchTerm($search_term) {
		
		// not in cache
		if (!$this->redis->hexists('searches', $search_term)) {	
			
			$imdb = new ImdbSearch();
			$responseesponse = $imdb->query($search_term);
			$responseesult = json_decode($responseesponse, true);
			
			// cache response for this search term
			$this->redis->hset('searches', $search_term, $responseesponse);
			
		} else {	
			
			// read from cache
			$responseesult = json_decode($this->redis->hget('searches', $search_term), true);
		}
		
		return $responseesult;
	}
	
	public function getCommonActors() {
		
		$query_actors = array();
		
		foreach ($this->query as $search_term) {
			
			$search_term_actors = array();
			
			$imdb_entries = $this->getImdbEntriesBySearchTerm($search_term);
			
			foreach($imdb_entries as $imdb_entry) {
			
				array_push($this->query_imdb_entries, $imdb_entry);
				
				if (array_key_exists('actors', $imdb_entry)) {
				
					$imdb_entry_actors = array();
				
					foreach ($imdb_entry['actors'] as $actor) {		
						array_push($imdb_entry_actors, $actor);
					}
				
					$search_term_actors = array_merge($search_term_actors, $imdb_entry_actors);
				}
			}
			
			$search_term_actors = array_unique($search_term_actors);

			array_push($query_actors, $search_term_actors);
		}
		
		$this->matches = call_user_func_array('array_intersect', $query_actors);
		
		return $this->matches;
	}
	
	public function json() {
		
		$response = array();
		
		foreach ($this->matches as $match) {
			
			$m = array();
			
			foreach($this->query_imdb_entries as $imdb_entry) {
				
				$searches = array_search($match, $imdb_entry['actors']);
				
				if ($searches !== false) {
					array_push($m, $imdb_entry);
				}
			}
			
			array_push($response, array(
				'actor' => $match,
				'imdb_entries' => $m
			));
		}
		
		return $response;
	}
	
	public function getResults() {
		return $this->results;
	}
}