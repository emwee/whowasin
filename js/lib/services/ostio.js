// Generated by CoffeeScript 1.6.2
(function() {
  var Ostio, ServiceProvider, User, config,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  config = require('config');

  ServiceProvider = require('lib/services/service-provider');

  User = require('models/user');

  module.exports = Ostio = (function(_super) {
    __extends(Ostio, _super);

    Ostio.prototype.baseUrl = config.api.root;

    function Ostio() {
      this.loginStatusHandler = __bind(this.loginStatusHandler, this);
      this.loginHandler = __bind(this.loginHandler, this);
      var authCallback;

      Ostio.__super__.constructor.apply(this, arguments);
      this.accessToken = localStorage.getItem('accessToken');
      authCallback = _(this.loginHandler).bind(this, this.loginHandler);
      this.subscribeEvent('auth:callback:ostio', authCallback);
    }

    Ostio.prototype.load = function() {
      this.resolve();
      return this;
    };

    Ostio.prototype.isLoaded = function() {
      return true;
    };

    Ostio.prototype.ajax = function(type, url, data) {
      url = this.baseUrl + url;
      if (this.accessToken) {
        url += "?access_token=" + this.accessToken;
      }
      return $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: 'json'
      });
    };

    Ostio.prototype.triggerLogin = function(loginContext) {
      var callback;

      callback = _(this.loginHandler).bind(this, this.loginHandler);
      return window.location = URL;
    };

    Ostio.prototype.loginHandler = function(loginContext, response) {
      if (response) {
        this.publishEvent('loginSuccessful', {
          provider: this,
          loginContext: loginContext
        });
        this.accessToken = response.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
        return this.getUserData().done(this.processUserData);
      } else {
        return this.publishEvent('loginFail', {
          provider: this,
          loginContext: loginContext
        });
      }
    };

    Ostio.prototype.getUserData = function() {
      return this.ajax('get', '/v1/users/me');
    };

    Ostio.prototype.processUserData = function(response) {
      return this.publishEvent('userData', response);
    };

    Ostio.prototype.getLoginStatus = function(callback, force) {
      if (callback == null) {
        callback = this.loginStatusHandler;
      }
      if (force == null) {
        force = false;
      }
      return this.getUserData().always(callback);
    };

    Ostio.prototype.loginStatusHandler = function(response, status) {
      var parsed;

      if (!response || status === 'error') {
        return this.publishEvent('logout');
      } else {
        parsed = User.prototype.parse.call(null, response);
        return this.publishEvent('serviceProviderSession', _.extend(parsed, {
          provider: this,
          userId: response.id,
          accessToken: this.accessToken
        }));
      }
    };

    return Ostio;

  })(ServiceProvider);

}).call(this);
