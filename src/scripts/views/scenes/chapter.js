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
      this.id = this.options.id;
      this.data = this.options.data;
      this.tileFrom = this.data.tileFrom;
      this.controller = this.options.controller;
      this.year = this.data.year;
      this.duration = '150%';
      this.parentView = this.options.parentView;

      this.tileBasicRot = 7;

      return this;
    },

    render: function () {
      this.setupElements();

      this.renderScrollMagic();

      this.setupEvents();

      return this;
    },

    renderScrollMagic: function () {
      this.updateLandmark();
      this.updatePositions();
      this.updateTimeline();
      this.createScrollMagicScene();
    },

    setupElements: function () {
      this.$tile = this.$el.find('#tile-' + this.year);
      this.$body = this.$el.find('.body');
      this.$landmark = this.$el.find('.landmark');
      this.$title = this.$body.find('.title');
      this.$text = this.$body.find('.text');

      // Landmark sizes
      this.$landmarkImg = this.$landmark.find('.img');
      this.originalLandmarkW = this.$landmarkImg[0].width;
      this.originalLandmarkH = this.$landmarkImg[0].height;
    },

    setupEvents: function () {

    },

    updateLandmark: function() {
      this.landmarkSize = this.parentView.updateLandmarkSize(this.originalLandmarkW, this.originalLandmarkH);
      this.landmarkW = this.landmarkSize.width;
      this.landmarkH = this.landmarkSize.height;
      this.landmarkIsPortrait = this.landmarkSize.isPortrait;
    },

    updatePositions: function () {
      var tileDir = this.tileFrom === 'l' ? -1 : 1;
      var tileRot = (this.tileFrom === 'l' ? this.tileBasicRot : -this.tileBasicRot) * 6;

      this.tileSize = this.$tile.width();
      var h = this.landmarkH * 1.6;
      // var h = this.landmarkIsPortrait ? this.landmarkH * 1.5 : this.tileSize * 1.5;

      TweenMax.set(this.$body, {
        height: h + 'px',
      });
      TweenMax.set(this.$tile, {
        x: tileDir * App.width,
        rotation: tileRot
      });
      TweenMax.set(this.$landmark, {
        x: -1 * tileDir * App.width,
        y: '-50%',
        opacity: 1,
        width: this.landmarkW + 'px',
        height: this.landmarkH + 'px',
      });
      TweenMax.set(this.$title, {
        y: 20,
        opacity: 0,
      });
      TweenMax.set(this.$text, {
        y: -20,
        opacity: 0,
      });
    },

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;
      var tileX = this.tileFrom === 'l' ? '-50%' : '50%';
      var tileRot = this.tileFrom === 'l' ? -this.tileBasicRot : this.tileBasicRot;
      var landmarkX = this.tileFrom === 'l' ? '-10%' : '-90%';

      tl.to(this.$tile, 2, {
        // scale: 1.2, //
        x: tileX,
        rotation: tileRot,
        ease: Back.easeOut,
      });

      tl.to(this.$landmark, 0.8, {
        x: landmarkX,
        y: '-50%',
        rotation: -1 * tileRot,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to(this.$title, 0.6, {
        y: -20,
        opacity: 1,
        rotation: -8 + Math.random() * 8,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to(this.$text, 0.6, {
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
      // .addIndicators()
        .setPin(this.el, {pushFollowers: true})
        .setTween(this.tl)
        .addTo(this.controller);
    },

    onResize: function () {
      this.sceneWidth = this.$el.width();
      this.tileSize = this.$tile.width();

      this.scene.destroy(true);
      this.renderScrollMagic();
    },

  };

  return View;

});