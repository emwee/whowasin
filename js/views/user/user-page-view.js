// Generated by CoffeeScript 1.6.2
(function() {
  var Collection, OrganizationOwnersView, PageView, Repo, ReposView, User, UserOrganizationsView, UserPageView, UserRepoSyncView, UsersView, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  OrganizationOwnersView = require('views/user/organization-owners-view');

  PageView = require('views/base/page-view');

  Repo = require('models/repo');

  ReposView = require('views/repo/repos-view');

  template = require('./templates/user-page');

  User = require('models/user');

  UserOrganizationsView = require('views/user/user-organizations-view');

  UsersView = require('views/user/users-view');

  UserRepoSyncView = require('views/user/user-repo-sync-view');

  module.exports = UserPageView = (function(_super) {
    __extends(UserPageView, _super);

    function UserPageView() {
      _ref = UserPageView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserPageView.prototype.template = template;

    UserPageView.prototype.getNavigationData = function() {
      return {
        gravatar_id: this.model.get('gravatar_id'),
        user_login: this.model.get('login')
      };
    };

    UserPageView.prototype.renderSubviews = function() {
      var repoSyncView,
        _this = this;

      this.repos = new Collection(null, {
        model: Repo
      });
      this.repos.url = this.model.url('/repos/');
      this.subview('repos', new ReposView({
        collection: this.repos,
        container: this.$('.user-repo-list-container')
      }));
      this.repos.fetch();
      this.organizations = this.model.get('organizations');
      this.owners = this.model.get('owners');
      if (this.model.get('type') === 'User' && this.organizations.length > 0) {
        this.subview('organizations', new UserOrganizationsView({
          collection: this.organizations,
          container: this.$('.user-organization-list-container')
        }));
      } else if (this.owners.length > 0) {
        this.subview('owners', new OrganizationOwnersView({
          collection: this.owners,
          container: this.$('.user-owner-list-container')
        }));
      }
      this.repoSync = new Collection(null, {
        model: Repo
      });
      this.repoSync.url = this.model.url('/sync_repos/');
      this.repoSync.fetch = function(options) {
        return $.post(_this.repoSync.url);
      };
      repoSyncView = new UserRepoSyncView({
        collection: this.repoSync,
        container: this.$('.user-repo-sync-container'),
        login: this.model.get('login')
      });
      this.subview('repoSync', repoSyncView);
      return repoSyncView.on('sync', function() {
        return _this.repos.fetch();
      });
    };

    UserPageView.prototype.dispose = function() {
      var _this = this;

      if (this.disposed) {
        return;
      }
      ['repos', 'organizations', 'owners', 'repoSync'].forEach(function(attr) {
        _this[attr].dispose();
        return delete _this[attr];
      });
      return UserPageView.__super__.dispose.apply(this, arguments);
    };

    return UserPageView;

  })(PageView);

}).call(this);