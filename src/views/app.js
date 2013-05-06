define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {


	var InPutView = Backbone.View.extend({
		
		tagName: 'input',
		
		render: function() {
			var data = {
			}
			
			this.$el.html(this.template(data));
			return this;
		}
	});
	
	var AppView = Backbone.View.extend({
		
		el: $('#foo'),
		
		events: {
		
			'click #submit': 'queryResults'
		},
		
		initialize: function() {
			
		},
		
		makeFields: function() {
			
			
		},
		
		addField: function() {
			
		},
		
		queryResults: function() {
			
		},
		
		render: function() {
			
		}
	});
	
	return AppView;
});