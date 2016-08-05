define(function (require) {

  var $ = require('jquery');
  var App = require('global');

  // Scrollmagic
  var ScrollMagic = require('ScrollMagic');
  require('ScrollMagicAnimation');
  require('ScrollMagicIndicators');

  // Data
  var scenesData = require('../data/scenes');

  // Views
  var SceneView = require('./scene');
  var LoaderView = require('./loader');
  var GAView = require('./google-analytics');

  // Templates
  var tpl = require('hbs!../tpl/main');
  var scenesTpl = {
    intro: require('hbs!../tpl/scenes/intro'),
    chapter: require('hbs!../tpl/scenes/chapter'),
    end: require('hbs!../tpl/scenes/end'),
  };

  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {

    },

    render: function () {
      this.$el.html(tpl({
        id: App.id,
        basePath: App.basePath,
      }));

      this.loader = new LoaderView({
        el: document.getElementById(App.id + '-loader'),
        basePath: App.basePath,
        imgPath: App.imgPath,
        imagesToPreload: App.imagesToPreload,
        callback: this.onAssetsLoaded.bind(this),
      });
      this.loader.render().load();

      console.log(App);

      this.setupElements();
    },

    onAssetsLoaded: function () {
      // Scrollmagic
      this.controller = new ScrollMagic.Controller();

      // Refresh sizes BEFORE rendering scenes
      this.onResize();
      this.renderScenes();
      // this.renderGoogleAnalytics();

      setTimeout(function () {
        // Refresh sizes AFTER rendering scenes
        this.onResize();
        this.setupEvents();
        this.loader.remove();
      }.bind(this), 500);
    },

    renderScenes: function () {
      this.scenes = [];

      console.log(scenesData);

      scenesData.forEach(function (s) {
        var scene = new SceneView({
          controller: this.controller,
          data: s,
          tpl: scenesTpl[s.type],
          $parent: this.$app,
          scenesData: scenesData,
          basePath: App.basePath,
        });
        scene.render();

        this.scenes.push(scene);
      }.bind(this));
    },

    renderGoogleAnalytics: function () {
      var ga = new GAView({
        el: document.getElementById(App.id + '-ga'),
        id: 'UA-0000000-1',
      });
      ga.render();
    },

    setupElements: function () {
      this.$app = this.$el.find('.app');
      this.$scrollIcon = this.$el.find('.scroll-icon');
    },

    showScrollIcon: function() {
      TweenMax.to(this.$scrollIcon, 0.5, {opacity: 1});
    },

    hideScrollIcon: function() {
      TweenMax.to(this.$scrollIcon, 0.5, {opacity: 0});
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onResize: function () {
      console.log('resize (main)');

      App.container = {
        width: this.$el.width(),
        height: this.$el.height(),
      };

      if (this.scenes) {
        this.scenes.forEach(function (s) {
          if (s.onResize) {
            s.onResize();
          }
        });
      }

      if (this.controller) {
        setTimeout(function () {
          this.controller.update(true);
        }.bind(this), 200);
      }
    },

  };

  return View;

});