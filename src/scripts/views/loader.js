define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var imagesLoaded = require('imagesloaded');
  var TweenMax = require('TweenMax');

  var tpl = require('hbs!../tpl/loader');

  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.imgPath = this.options.imgPath;
      this.callback = this.options.callback;
      this.imagesToPreload = this.options.imagesToPreload;

      this.$body = $('body');
    },

    render: function () {
      this.$el.html(tpl({
        basePath: App.basePath,
        imgPath: this.imgPath || 'images/',
        imagesToPreload: this.imagesToPreload || [],
      }));

      this.setupElements();
      this.setupEvents();

      return this;
    },

    load: function () {
      var el = this.$el.find('.hidden-images');
      var loader = imagesLoaded(el, this.onLoaded.bind(this));
      loader.on('progress', this.onProgress.bind(this));

      this.$spin.hide();

      return this;
    },

    onProgress: function(e) {
      var percent = (e.progressedCount / e.images.length) * 100;

      TweenMax.set(this.$progress, {
        x: -(100 - percent) + '%',
      });
    },

    onLoaded: function(e) {
      TweenMax.to(this.$progress, 0.2, {
        x: 0,
        onComplete: function() {
          if (_.isFunction(this.callback)) {
            this.callback();
          }
        }.bind(this),
      });

      // this.remove();
    },

    remove: function() {
      var that = this;

      TweenMax.to(this.$el, 0.2, {
        opacity: 0,
        onComplete: function() {
          that.$el.hide(); //
        },
      });
    },

    setupElements: function () {
      this.$spin = this.$el.find('.spin');
      this.$progress = this.$el.find('.progress');
    },

    setupEvents: function () {

    },

  };

  return View;

});