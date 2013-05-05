define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
	
	var AppView = Backbone.View.extend({
		
		initialize: function() {
		
			var MovieSearch = Backbone.Collection.extend({
				url: function() {
					return '/whowasin/find' + this.query_string;;
				},

				initialize: function() {
					this.imdb_ids = [];
					this.query_string = '';
				},

				setImdbId: function(imdb_id) {
					this.imdb_ids.push(imdb_id);
				},

				query: function() {
					console.log(this.search_terms);
					
					var self = this;
					
					_.each(this.imdb_ids, function(imdb_id) {
						self.query_string += (self.query_string.length > 0) ? '&' : '?';
						self.query_string += 'imdb_ids[]=' + imdb_id;
					});
					
					this.fetch();
				}
			});

			var MovieSearchView = Backbone.View.extend({

				initialize: function() {
					
					_(this).bindAll( 'bla', 'sss');
					
					this.collection.bind('reset', this.bla, this);
				},

				bla: function(matches) {
					console.log('---');
					console.log(matches);
					
					matches.each(this.sss);
				},
				
				sss: function(match) {
					console.log('-----')
					console.log(match.get('actor'));
					console.log(match.get('imdb_entries'));
					console.log(_.pluck(match.get('imdb_entries'), 'title'));
					console.log(_.pluck(match.get('imdb_entries'), 'imdb_id'));
					console.log(_.pluck(match.get('imdb_entries'), 'actors'));
				}

			});

			var movie_search = new MovieSearch();

			var movie_search_view = new MovieSearchView({
				collection: movie_search
			});
			
			movie_search.setImdbId('tt0114369');
			movie_search.setImdbId('tt0120102');

			movie_search.query();
		}
	});
	
	return AppView;
});