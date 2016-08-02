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
      }));

      this.loader = new LoaderView({
        el: document.getElementById(App.id + '-loader'),
        imgPath: App.imgPath,
        imagesToPreload: App.imagesToPreload,
        callback: this.onAssetsLoaded.bind(this),
      });
      this.loader.render().load();

      console.log(App);

      this.setupElements();
      this.setupEvents();
    },

    onAssetsLoaded: function (e) {
      console.log(e);

      // Scrollmagic
      this.controller = new ScrollMagic.Controller();

      this.renderScenes();

      // Refresh sizes
      this.onResize();

      // this.renderGoogleAnalytics();
    },

    renderScenes: function () {
      this.scenes = [];

      console.log(scenesData);

      scenesData.forEach(function (s, i) {
        var scene = new SceneView({
          controller: this.controller,
          data: s,
          tpl: scenesTpl[s.type],
          $parent: this.$app,
          scenesData: scenesData,
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
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onResize: function (e) {
      this.$el.find('.full-height').height(App.height);
    },

  };

  return View;

});