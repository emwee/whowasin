define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
	
	var AppView = Backbone.View.extend({
		
		initialize: function() {
		
			var MovieSearch = Backbone.Collection.extend({
				url: function() {
					return '/whowasin/search' + this.query_string;;
				},

				initialize: function() {
					this.search_terms = [];
					this.query_string = '';
				},

				setSearchTerm: function(search_term) {
					this.search_terms.push(search_term);
				},

				query: function() {
					console.log(this.search_terms);
					
					var self = this;
					
					_.each(this.search_terms, function(search_term) {
						self.query_string += (self.query_string.length > 0) ? '&' : '?';
						self.query_string += 'movies[]=' + search_term;
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

			movie_search.setSearchTerm('se7en');
			movie_search.setSearchTerm('seven');
			movie_search.setSearchTerm('seven');
			movie_search.setSearchTerm('babel');

			movie_search.query();
		}
	});
	
	return AppView;
});