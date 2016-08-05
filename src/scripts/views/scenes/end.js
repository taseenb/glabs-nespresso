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
      this.duration = App.height * 5;
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

    setupElements: function () {
      this.$imagesWrapper = this.$el.find('.images-wrapper');
      this.$tiles = this.$imagesWrapper.find('.tile');
      this.$tile1986 = this.$tiles.filter('#tile-1986');
      this.$tile1986End = this.$tiles.filter('#tile-1986end');
      this.$otherTiles = this.$tiles.not(this.$tile1986).not(this.$tile1986End);
      this.$body = this.$el.find('.body');
      this.$landmark = this.$el.find('.landmark');
      this.$title = this.$body.find('.title');
      this.$text = this.$body.find('.text');

      // console.log(this.$imagesWrapper, this.$tile, this.$body, this.$landmark, this.$title, this.$text);
      console.log(this.$tiles.length, this.$otherTiles.length);
      this.tilesCount = Math.floor(this.$tiles.length / 2);

      // Landmark sizes
      this.$landmarkImg = this.$landmark.find('.img');
      this.originalLandmarkW = this.$landmarkImg[0].width;
      this.originalLandmarkH = this.$landmarkImg[0].height;
    },

    setupEvents: function () {

    },

    renderScrollMagic: function () {
      this.updateLandmark();
      this.updatePositions();
      this.updateChapterTimeline();
      this.updateTimeline();
      this.createScrollMagicScene();
    },

    updateLandmark: function () {
      this.landmarkSize = this.parentView.updateLandmarkSize(this.originalLandmarkW, this.originalLandmarkH);
      this.landmarkW = this.landmarkSize.width;
      this.landmarkH = this.landmarkSize.height;
      this.landmarkIsPortrait = this.landmarkSize.isPortrait;
    },

    updatePositions: function () {
      var tileDir = this.tileFrom === 'l' ? -1 : 1;
      var tileRot = (this.tileFrom === 'l' ? this.tileBasicRot : -this.tileBasicRot) * 6;

      this.tileSize = this.$tile1986.width();
      var h = this.landmarkH * 1.6;
      // var h = this.landmarkIsPortrait ? this.landmarkH * 1.5 : this.tileSize * 1.5;

      TweenMax.set(this.$tiles, {
        x: 0,
        y: 0,
        rotation: 0,
      });
      TweenMax.set(this.$tile1986, {
        x: tileDir * App.width,
        rotation: tileRot,
        opacity: 1,
        zIndex: 50,
      });
      TweenMax.set(this.$otherTiles, {
        opacity: 0,
      });
      TweenMax.set(this.$body, {
        height: h + 'px',
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

    updateChapterTimeline: function () {
      this.chapterTl = new TimelineMax();
      var tl = this.chapterTl;
      var tileX = this.tileFrom === 'l' ? '-50%' : '50%';
      var tileRot = this.tileFrom === 'l' ? -this.tileBasicRot : this.tileBasicRot;
      var landmarkX = this.tileFrom === 'l' ? '-10%' : '-90%';

      tl.to(this.$tile1986, 0.6, {
        // scale: 1.2,
        x: tileX,
        rotation: tileRot,
        ease: Back.easeOut,
      });

      tl.to(this.$landmark, 0.2, {
        x: -20,
        y: '-50%',
        rotation: 2,
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

      tl.to(this.$text, 1, {x: 0});
    },

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;

      tl.add(this.chapterTl);

      tl.to(this.$text, 0.6, {
        y: 0,
        opacity: 0,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to(this.$title, 0.6, {
        y: 20,
        opacity: 0,
        rotation: 0,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to(this.$landmark, 0.2, {
        x: App.width,
        y: '-50%',
        rotation: 0,
        ease: Power3.easeOut,
      }, '-=0.2');

      tl.to(this.$tile1986, 0.6, {
        x: '0%',
        rotation: 0,
        ease: Back.easeOut,
      });

      tl.to(this.$tile1986End, 0.5, {opacity: 1}, '-=0.2');

      tl.set(this.$otherTiles, {opacity: 1}, '-=0.2');

      this.$otherTiles.each(function (i, el) {
        tl.fromTo(el, 0.3, {
          y: -App.height, // + (App.height * 0.3),
          x: -(App.width / 2) + (Math.random() * (App.width * 0.6) + (App.width * 0.2)),
          rotation: -40 + Math.random() * 40,
          zIndex: 1,
        }, {
          x: 0,
          y: 0,
          rotation: 0,
          ease: Back.easeOut,
        }, '-=0.2');
      });

      tl.set(this.$otherTiles, {display: 'none'});

      tl.to(this.$tile1986End, 2, {y: 0, x: 0}, '-=0.2');
    },

    createScrollMagicScene: function () {
      this.scene = new ScrollMagic.Scene({
        triggerElement: this.el,
        duration: this.duration * 2,
        offset: 0,
        triggerHook: 0,
      })
      // .addIndicators()
        .setPin(this.el)
        .setTween(this.tl)
        .addTo(this.controller);
    },

    onResize: function () {
      this.sceneWidth = this.$el.width();
      this.tileSize = this.$tile1986.width();

      this.scene.destroy(true);
      this.renderScrollMagic();
    },

  };

  return View;

});