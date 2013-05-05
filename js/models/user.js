// Generated by CoffeeScript 1.6.2
(function() {
  var Collection, Model, User, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Collection = require('models/base/collection');

  module.exports = User = (function(_super) {
    __extends(User, _super);

    function User() {
      _ref = User.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    User.prototype.urlKey = 'login';

    User.prototype.urlPath = function() {
      return '/users/';
    };

    User.prototype.parse = function(response) {
      var options, organizations, owners;

      if (response == null) {
        return this.previousAttributes;
      }
      options = {
        model: User
      };
      if (response.organizations != null) {
        organizations = new Collection(response.organizations, options);
        _.extend(response, {
          organizations: organizations
        });
      }
      if (response.owners != null) {
        owners = new Collection(response.owners, options);
        _.extend(response, {
          owners: owners
        });
      }
      return response;
    };

    User.prototype.isAdmin = function() {
      return this.get('login') === 'paulmillr';
    };

    return User;

  })(Model);

}).call(this);