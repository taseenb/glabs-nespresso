define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TweenMax = require('TweenMax');

  // Data
  var scenesData = require('../data/scenes');

  // GSAP ScrollTo Plugin
  require('ScrollToPlugin');

  // Template
  var tpl = require('hbs!../tpl/menu');


  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.parentView = this.options.parentView;

      App.mainView.controller.scrollTo(function (newpos) {
        TweenMax.to(window, 1.6, {
          scrollTo: {y: newpos},
          ease: Cubic.easeInOut,
        });
      });
    },

    render: function () {
      this.$el.html(tpl({
        scene: scenesData,
        basePath: App.basePath,
      }));

      this.setupElements();
      this.setupEvents();

      return this;
    },

    setupElements: function () {
      this.$items = this.$el.find('.item');
    },

    setupEvents: function () {
      this.$items.on(App.click, this.onClick.bind(this));
    },

    onClick: function(e) {
      var year = $(e.currentTarget).data('year');
      var href = $(e.currentTarget).data('href');
      var idx = $(e.currentTarget).data('idx');
      var sceneContainer = App.mainView.scenes[idx];
      var scrollMagicScene = sceneContainer.sceneView.scene;
      var scrollOffset = scrollMagicScene.scrollOffset();
      var sceneDuration = scrollMagicScene.duration() - 20;

      App.mainView.controller.scrollTo(scrollOffset + sceneDuration);

      // console.log(scrollOffset + sceneDuration, idx, year, href);
    },

  };

  return View;

});