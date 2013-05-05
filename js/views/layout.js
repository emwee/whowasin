// Generated by CoffeeScript 1.6.2
(function() {
  var Chaplin, Layout, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {
    __extends(Layout, _super);

    function Layout() {
      this.trackVisit = __bind(this.trackVisit, this);      _ref = Layout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Layout.prototype.initialVisit = true;

    Layout.prototype.initialize = function() {
      Layout.__super__.initialize.apply(this, arguments);
      return this.subscribeEvent('dispatcher:dispatch', this.trackVisit);
    };

    Layout.prototype.trackVisit = function() {
      var gauges;

      gauges = window._gauges;
      if (this.initialVisit) {
        if (gauges != null) {
          gauges.track_referrer = true;
        }
        this.initialVisit = false;
      }
      return gauges != null ? gauges.push(['track']) : void 0;
    };

    return Layout;

  })(Chaplin.Layout);

}).call(this);