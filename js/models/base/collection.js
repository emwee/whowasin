// Generated by CoffeeScript 1.6.2
(function() {
  var Chaplin, Collection, Model, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _(Collection.prototype).extend(Chaplin.SyncMachine);

    Collection.prototype.model = Model;

    Collection.prototype.initialize = function(models, options) {
      if ((options != null ? options.url : void 0) != null) {
        this.url = options.url;
      }
      return Collection.__super__.initialize.apply(this, arguments);
    };

    Collection.prototype.urlPath = function() {
      return "/users/" + this.urlParams.login + "/repos/" + this.urlParams.repoName + "/topics/" + this.urlParams.topicNumber + "/posts/";
    };

    return Collection;

  })(Chaplin.Collection);

}).call(this);
