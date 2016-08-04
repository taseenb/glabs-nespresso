define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');
  var ScrollMagic = require('ScrollMagic');


  var $tile;
  var $body;
  var $landmark;
  var $title, $text;


  function View(options) {
    this.options = options;
    this.el = options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.data = this.options.data;
      this.controller = this.options.controller;
      this.year = this.data.year;
      this.duration = App.height * 1.5;
    },

    render: function () {
      this.setupElements();

      this.updatePositions();
      this.updateTimeline();
      this.createScrollMagicScene();

      this.setupEvents();
    },

    setupElements: function () {
      $tile = this.$el.find('#tile-' + this.year);
      $body = this.$el.find('.body');
      $landmark = this.$el.find('.landmark');
      $title = $body.find('.title');
      $text = $body.find('.text');
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    updatePositions: function () {
      TweenMax.set($landmark, {y: '-50%'});
      TweenMax.set($title, {y: 20, opacity: 0});
      TweenMax.set($text, {y: -20, opacity: 0});
      TweenMax.set($landmark, {x: App.width, y: '-50%', opacity: 1});
    },

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;
      var tileSize = $tile.width();

      tl.to($landmark, 0.2, {
        x: -20,
        y: '-50%',
        rotation: 5,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to($title, 0.6, {
        y: -20,
        opacity: 1,
        rotation: -8 + Math.random() * 8,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to($text, 0.6, {
        y: 20,
        opacity: 1,
        ease: Power3.easeOut,
      }, '-=0.2');
    },

    createScrollMagicScene: function () {
      this.scene = new ScrollMagic.Scene({
        triggerElement: this.el,
        duration: this.duration,
        offset: 0,
        triggerHook: 0,
      })
        .addIndicators()
        .setPin(this.el)
        .setTween(this.tl)
        .addTo(this.controller);
    },

    onResize: function () {
      this.scene.destroy(true);
    },

  };

  return View;

});