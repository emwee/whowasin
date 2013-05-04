// Generated by CoffeeScript 1.6.2
(function() {
  module.exports = function(match) {
    match('', 'home#show');
    match('logout', 'auth#logout');
    match('feed', 'feed#show');
    match('settings', 'settings#show');
    match('auth-callback/', 'auth#callback');
    match('@:login', 'users#show');
    match('@:login/:repoName', 'repos#show');
    match('@:login/:repoName/', 'topics#index');
    match('@:login/:repoName/topics', 'topics#index');
    match('@:login/:repoName/topics/', 'topics#index');
    return match('@:login/:repoName/topics/:topicNumber', 'topics#show');
  };

}).call(this);
