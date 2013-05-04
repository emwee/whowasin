// Generated by CoffeeScript 1.6.2
(function() {
  var Collection, FeedPageView, FeedPostsView, PageView, Post, User, UsersView, config, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  config = require('config');

  FeedPostsView = require('views/feed/feed-posts-view');

  PageView = require('views/base/page-view');

  Post = require('models/post');

  template = require('./templates/feed-page');

  User = require('models/user');

  UsersView = require('views/user/users-view');

  module.exports = FeedPageView = (function(_super) {
    __extends(FeedPageView, _super);

    function FeedPageView() {
      _ref = FeedPageView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FeedPageView.prototype.autoRender = true;

    FeedPageView.prototype.template = template;

    FeedPageView.prototype.renderSubviews = function() {
      var posts, users;

      users = new Collection(null, {
        model: User
      });
      users.url = "" + config.api.versionRoot + "/users/";
      this.subview('users', new UsersView({
        collection: users,
        container: this.$('.user-list-container')
      }));
      users.fetch();
      posts = new Collection(null, {
        model: Post
      });
      posts.url = "" + config.api.versionRoot + "/posts/";
      this.subview('posts', new FeedPostsView({
        collection: posts,
        container: this.$('.post-list-container')
      }));
      return posts.fetch();
    };

    return FeedPageView;

  })(PageView);

}).call(this);
