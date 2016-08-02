define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TweenMax = require('TweenMax');

  var ScrollMagicIntro = require('./scenes/intro');
  var ScrollMagicChapter = require('./scenes/chapter');
  var ScrollMagicEnd = require('./scenes/end');


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
      this.controller = this.options.controller;

      this.scrollMagicScene = null;

      // Scene data
      this.id = this.data.id;
      this.type = this.data.type;
      this.contentTpl = this.data.contentTpl;
    },

    render: function () {
      var tplOptions = {
        id: 'scene-' + this.id,
        type: this.type,
        year: this.data.year,
        title: this.data.title,
        copy: this.data.copy,
        introCopy: this.data.introCopy,
      };

      if (this.type === 'chapter') {
        tplOptions.content = this.contentTpl({
          id: 'yoyo-' + this.id,
          year: this.data.year,
        });
      } else if (this.type === 'intro') {
        var scenesDataClone = _.clone(this.scenesData);
        // Add intro element (BC image)
        scenesDataClone.unshift({
          id: 'BC',
          year: 'BC',
          chapter: true,
        });
        tplOptions.tiles = _.shuffle(scenesDataClone);
      }

      // Append template content
      this.$parent.append(this.tpl(tplOptions));

      // Update the element of the view
      this.$el = $('#scene-' + this.id);
      this.el = this.$el[0];

      this.setupElements();
      this.setupEvents();

      this.createScrollMagicScene();

      return this;
    },

    setupElements: function () {

    },

    setupEvents: function () {

    },

    createScrollMagicScene: function () {
      var options = {
        controller: this.controller,
        data: this.data,
        $el: this.$el,
      };

      var fn = function() {};

      switch (this.type) {
        case 'intro':
          fn = ScrollMagicIntro;
          break;
        case 'chapter':
          fn = ScrollMagicChapter;
          break;
        case 'end':
          fn = ScrollMagicEnd;
          break;
      }

      this.scrollMagicScene = fn(options);
    },

  };

  return View;

});