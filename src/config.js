// Generated by CoffeeScript 1.6.2
(function() {
  var config, production;

  config = {
    api: {}
  };

  production = true;

  config.api.root = production ? 'http://api.ost.io' : 'http://localhost:8888/whowasin';

  config.api.versionRoot = config.api.root + '/v1';

  module.exports = config;

}).call(this);
