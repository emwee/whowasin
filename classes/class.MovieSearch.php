<?php

class MovieSearch {
	
	private $redis;
	
	public function __construct(&$redis) {
		$this->redis = $redis;
		$this->query = array();
		$this->results = array();
		$this->query_imdb_entries = array();
		$this->matches = array();

		$this->imdb_ids = array();
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
			$response = $imdb->query($search_term);
			
			// cache response for this search term
			$this->redis->hset('searches', $search_term, $response);

			$result = json_decode($response, true);

			foreach ($result as $imdb_entry) {
				$this->redis->hset('imdb_entries', 'imdb_id:'.$imdb_entry['imdb_id'], json_encode($imdb_entry));
			}

		} else {	
			
			// read from cache
			$result = json_decode($this->redis->hget('searches', $search_term), true);
		}
		
		return $result;
	}

	public function getSuggestions($search_term) {

		$suggestions = $this->getImdbEntriesBySearchTerm($search_term);

		return $suggestions;

	}

	public function setImdbId($imdb_id) {

		array_push($this->imdb_ids, $imdb_id);

	}

	public function findCommon() {

		$response = array();
		$query_actors = array();
		$query_imdb_entries = array();

		foreach ($this->imdb_ids as $imdb_id) {

			$imdb_entry_actors = array();

			$imdb_entry = json_decode($this->redis->hget('imdb_entries', 'imdb_id:'.$imdb_id), true);

			if (array_key_exists('actors', $imdb_entry)) {

				$imdb_entry_actors = array();

				foreach ($imdb_entry['actors'] as $actor) {
					array_push($imdb_entry_actors, $actor);
				}

				array_push($query_actors, $imdb_entry_actors);
				array_push($query_imdb_entries, $imdb_entry);
			}
		}

		$matches = call_user_func_array('array_intersect', $query_actors);

		foreach ($matches as $actor) {

			$actor_imdb_entries = array();

			foreach($query_imdb_entries as $imdb_entry) {

				$searches = array_search($actor, $imdb_entry['actors']);

				if ($searches !== false) {
					array_push($actor_imdb_entries, $imdb_entry);
				}
			}

			array_push($response, array(
				'actor' => $actor,
				'imdb_entries' => $actor_imdb_entries
			));
		}

		return $response;
	}
}