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

      // this.$html = $('html');

      this.$body = $('body');
    },

    render: function () {
      this.$el.html(tpl({
        basePath: App.root,
        imgPath: this.imgPath || 'images/',
        imagesToPreload: this.getImagesToPreload() || [],
      }));

      this.onResize();

      this.setupElements();
      this.setupEvents();

      return this;
    },

    setupElements: function () {
      this.$hiddenImages = this.$el.find('.hidden-images');
      this.$progress = this.$el.find('.progress');
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    load: function () {
      // this.$html.css('overflow', 'hidden');

      var loader = imagesLoaded(this.$hiddenImages, this.onLoaded.bind(this));
      loader.on('progress', this.onProgress.bind(this));

      return this;
    },

    onProgress: function(e) {
      var percent = (e.progressedCount / e.images.length) * 100;

      TweenMax.set(this.$progress, {
        // x: -(100 - percent) + '%',
        width: ~~percent + '%'
      });
    },

    onLoaded: function(e) {
      TweenMax.to(this.$progress, 0.2, {
        // x: 0,
        width: '100%',
        onComplete: function() {
          if (_.isFunction(this.callback)) {
            this.callback();
            // this.$html.css('overflow', '');
          }
        }.bind(this),
      });

      // this.remove();
    },

    remove: function() {
      var that = this;

      TweenMax.to(this.$el, 1, {
        opacity: 0,
        onComplete: function() {
          that.$el.hide();
        },
      });
    },

    getImagesToPreload: function() {
      var list = [];
      this.imagesToPreload.forEach(function(img, i) {
        list[i] = {
          filename: img,
          classname: this.cleanClassname(img)
        };
      }.bind(this));

      return list;
    },

    cleanClassname: function(string) {
      var s;
      s = string.replace('.', ' ');
      s = s.replace('/', ' ');

      return s;
    },

    onResize: function() {
      this.$el.height(App.height - App.guardianHeader);

      // console.log(App.height - App.guardianHeader);
    },

  };

  return View;

});