// Generated by CoffeeScript 1.6.2
(function() {
  var CollectionView, Repo, ReposView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/base/collection-view');

  Repo = require('views/repo/repo-view');

  module.exports = ReposView = (function(_super) {
    __extends(ReposView, _super);

    function ReposView() {
      _ref = ReposView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ReposView.prototype.className = 'user-repo-list';

    ReposView.prototype.itemView = Repo;

    ReposView.prototype.tagName = 'ul';

    return ReposView;

  })(CollectionView);

}).call(this);
