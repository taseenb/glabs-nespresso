define(function (require) {

  var $ = require('jquery');
  var App = require('global');
  var LoaderView = require('./loader');
  var GAView = require('./google-analytics');

  var tpl = require('hbs!../tpl/main');

  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function() {

    },

    render: function() {
      this.$el.html(tpl({
        id: App.id,
      }));

      this.loader = new LoaderView({
        el: document.getElementById(App.id + '-loader'),
        imgPath: App.imgPath,
        imagesToPreload: App.imagesToPreload,
        onLoaded: this.onAssetsLoaded.bind(this),
      });
      this.loader.render().load();

      console.log(App);

      this.setupElements();
      this.setupEvents();
    },

    onAssetsLoaded: function(e) {
      console.log(e);

      // Refresh sizes
      this.onResize();

      // this.renderGoogleAnalytics();
    },

    renderGoogleAnalytics: function() {
      var ga = new GAView({
        el: document.getElementById(App.id + '-ga'),
        id: 'UA-0000000-1',
      });
      ga.render();
    },

    setupElements: function() {

    },

    setupEvents: function() {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onResize: function(e) {
      this.$el.find('.full-height').height(App.height);
    },

  };

  return View;

});