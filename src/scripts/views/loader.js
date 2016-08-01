define(function (require) {

  var $ = require('jquery');
  var App = require('global');
  var imagesLoaded = require('imagesloaded');

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
      this.onLoaded = this.options.onLoaded;
      this.imagesToPreload = this.options.imagesToPreload;
    },

    render: function () {
      this.$el.html(tpl({
        imgPath: this.imgPath || 'images/',
        imagesToPreload: this.imagesToPreload || [],
      }));

      this.setupElements();
      this.setupEvents();

      return this;
    },

    load: function () {
      var el = this.$el.find('.hidden-images');
      imagesLoaded(el, this.onLoaded);

      this.$spin.hide();

      return this;
    },

    setupElements: function () {
      this.$spin = this.$el.find('.spin');
      this.$hiddenImages = this.$el.find('.hidden-images');
    },

    setupEvents: function () {

    },

  };

  return View;

});