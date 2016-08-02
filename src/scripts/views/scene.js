define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TweenMax = require('TweenMax');


  function View(options) {
    this.options = options;
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.data = this.options.data;
      this.tpl = this.options.tpl;
      this.$parent = this.options.$parent;
      this.scenesData = this.options.scenesData;

      // Scene data
      this.id = this.data.id;
      this.type = this.data.type;
      this.contentTpl = this.data.contentTpl;
    },

    render: function () {
      var tplOptions = {
        id: 'scene-' + this.id,
        type: this.type,
      };

      if (this.type === 'chapter') {
        tplOptions.content = this.contentTpl({
          id: 'yoyo-' + this.id,
        });
      } else if (this.type === 'intro') {
        tplOptions.tiles = this.scenesData;
      }

      // Append template content
      this.$parent.append(this.tpl(tplOptions));

      // Update the element of the view
      this.$el = $('#scene-' + this.id);
      this.el = this.$el[0];

      this.setupElements();
      this.setupEvents();

      return this;
    },

    setupElements: function () {

    },

    setupEvents: function () {

    },

  };

  return View;

});