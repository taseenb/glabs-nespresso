define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');
  var ScrollMagic = require('ScrollMagic');

  function View(options) {
    this.options = options;
    this.el = options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {

    },

    render: function () {


      this.setupElements();
      this.setupEvents();
    },

    setupElements: function () {

    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onResize: function () {

    },

  };

  return View;

});