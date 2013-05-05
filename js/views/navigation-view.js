// Generated by CoffeeScript 1.6.2
(function() {
  var NavigationView, View, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('./templates/navigation');

  module.exports = NavigationView = (function(_super) {
    __extends(NavigationView, _super);

    function NavigationView() {
      this.clearModel = __bind(this.clearModel, this);      _ref = NavigationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NavigationView.prototype.className = 'navigation';

    NavigationView.prototype.listen = {
      'change model': 'render',
      'navigation:change mediator': 'clearModel'
    };

    NavigationView.prototype.region = 'navigation';

    NavigationView.prototype.tagName = 'nav';

    NavigationView.prototype.template = template;

    NavigationView.prototype.clearModel = function(attributes) {
      this.model.clear();
      return this.model.set(attributes);
    };

    return NavigationView;

  })(View);

}).call(this);