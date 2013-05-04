// Generated by CoffeeScript 1.6.2
(function() {
  var Collection, NewTopicFormView, PageView, RepoPageView, Topic, TopicsView, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  NewTopicFormView = require('views/topic/new-topic-form-view');

  PageView = require('views/base/page-view');

  template = require('./templates/repo-page');

  Topic = require('models/topic');

  TopicsView = require('views/topic/topics-view');

  module.exports = RepoPageView = (function(_super) {
    __extends(RepoPageView, _super);

    function RepoPageView() {
      this.createNewTopic = __bind(this.createNewTopic, this);      _ref = RepoPageView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RepoPageView.prototype.template = template;

    RepoPageView.prototype.getNavigationData = function() {
      return {
        gravatar_id: this.model.get('user').get('gravatar_id'),
        user_login: this.model.get('user').get('login'),
        repo_name: this.model.get('name')
      };
    };

    RepoPageView.prototype.renderSubviews = function() {
      var _this = this;

      this.topics = new Collection(null, {
        model: Topic
      });
      this.topics.url = this.model.url('/topics/');
      this.subview('topics', new TopicsView({
        collection: this.topics,
        container: this.$('.repo-topic-list-container')
      }));
      this.topics.fetch();
      this.subscribeEvent('topic:new', function(topic) {
        return _this.topics.unshift(topic);
      });
      return this.createNewTopic();
    };

    RepoPageView.prototype.createNewTopic = function() {
      var topic, topicView,
        _this = this;

      topic = new Topic({
        repo: this.model
      });
      topicView = new NewTopicFormView({
        model: topic,
        container: this.$('.new-topic-form-container')
      });
      topicView.on('dispose', function() {
        return setTimeout(_this.createNewTopic, 0);
      });
      return this.subview('newTopicForm', topicView);
    };

    RepoPageView.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.topics.dispose();
      delete this.topics;
      return RepoPageView.__super__.dispose.apply(this, arguments);
    };

    return RepoPageView;

  })(PageView);

}).call(this);
