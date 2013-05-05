// Generated by CoffeeScript 1.6.2
(function() {
  var FormView, NewPostFormView, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FormView = require('views/base/form-view');

  template = require('./templates/new-post-form');

  module.exports = NewPostFormView = (function(_super) {
    __extends(NewPostFormView, _super);

    function NewPostFormView() {
      this.changeText = __bind(this.changeText, this);      _ref = NewPostFormView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NewPostFormView.prototype.className = 'post post-create';

    NewPostFormView.prototype.events = {
      'keyup .new-post-body': 'changeText',
      'keydown .new-post-body': 'changeText'
    };

    NewPostFormView.prototype.saveEvent = 'post:new';

    NewPostFormView.prototype.template = template;

    NewPostFormView.prototype.changeText = function(event) {
      var text;

      text = $(event.currentTarget).val().trim();
      if (event.metaKey && event.keyCode === 13) {
        return this.$el.trigger('submit');
      } else {
        return this.model.set({
          text: text
        });
      }
    };

    return NewPostFormView;

  })(FormView);

}).call(this);