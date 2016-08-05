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
      this.controller = this.options.controller;
      this.duration = '500%'; // App.height * 5;
      this.parentView = this.options.parentView;

      return this;
    },

    render: function () {
      this.setupElements();

      this.renderScrollMagic();

      this.setupEvents();

      return this;
    },

    setupElements: function () {
      this.$NespressoCup_01_Left = this.$el.find('.NespressoCup_01_Left');
      this.$rightCup = this.$el.find('.right-cup');
      this.$BiscuitsOnPlate_01 = this.$el.find('.BiscuitsOnPlate_01');
      this.$imagesWrapper = this.$el.find('.images-wrapper');
      this.$tiles = this.$imagesWrapper.find('.tile');
      this.$introTile = this.$tiles.filter('#tile-BC');
      this.$body = this.$el.find('.body');
      this.$introText = this.$body.find('.intro-text');
      this.$logoApp = this.$body.find('.logo-app');
      this.$introText1 = this.$introText.find('.inner-1');
      this.$introText2 = this.$introText.find('.inner-2');
      this.$landmark = this.$el.find('.landmark');
      this.$title = this.$body.find('.title');
      this.$text = this.$body.find('.text');

      // Get 2 random tiles (except the intro tile)
      this.tilesCount = Math.floor(this.$tiles.length / 2);
      var rndIdx1 = Math.floor(Math.random() * this.tilesCount);
      var rndIdx2 = this.tilesCount + Math.floor(Math.random() * this.tilesCount);
      this.$randomTile1 = this.$tiles.not(this.$introTile)[rndIdx1];
      this.$randomTile2 = this.$tiles.not(this.$introTile)[rndIdx2];

      // Landmark sizes
      this.$landmarkImg = this.$landmark.find('.img');
      this.originalLandmarkW = this.$landmarkImg[0].width;
      this.originalLandmarkH = this.$landmarkImg[0].height;

      // console.log($tiles, tilesCount, rndIdx1, rndIdx1, $randomTile1, $randomTile2);
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    renderScrollMagic: function () {
      this.updateLandmark();
      this.updatePositions();
      this.updateChapterTimeline();
      this.updateTimeline();
      this.createScrollMagicScenes();
    },

    updateLandmark: function() {
      this.landmarkSize = this.parentView.updateLandmarkSize(this.originalLandmarkW, this.originalLandmarkH);
      this.landmarkW = this.landmarkSize.width;
      this.landmarkH = this.landmarkSize.height;
      this.landmarkIsPortrait = this.landmarkSize.isPortrait;
    },

    // renderTextAnimation: function() {
    //   this.textTl = new TimelineMax();
    //
    //   // Blast - split all characters
    //   this.chars = $text.blast({delimiter: 'word'});
    //
    //   // $text.css('opacity', 1);
    //
    //   const dur = 0.05;
    //
    //   // Create the timeline with each character
    //   this.chars.each(function(i, char) {
    //     this.textTl.set(char, {opacity: 1}, '+=' + dur);
    //   }.bind(this));
    // },

    updatePositions: function () {
      this.$landmark.css({
        width: this.landmarkW + 'px',
        height: this.landmarkH + 'px',
      });
      this.tileSize = this.$introTile.width();
      var h = this.landmarkH * 1.6; //this.landmarkIsPortrait ? this.landmarkH * 1.5 : this.tileSize * 1.5;

      TweenMax.set(this.$body, {height: h + 'px'});
      TweenMax.set(this.$title, {y: 20, opacity: 0});
      TweenMax.set(this.$text, {y: -20, opacity: 0});
      TweenMax.set(this.$landmark, {x: App.width, y: '-50%', opacity: 1});
      TweenMax.set(this.$tiles, {x: 0, y: 0, rotation: 0});
      TweenMax.set(this.$imagesWrapper, {x: '0%', y: '0%'});
      TweenMax.set(this.$imagesWrapper, {x: '-32%', y: '-20%'});

      // Animate 2 random tiles
      TweenMax.to(this.$randomTile1, 0.66, {
        rotation: -5 + Math.random() * -5,
        x: Math.random() * -10,
        y: Math.random() * 10,
        ease: Back.easeOut,
      });
      TweenMax.to(this.$randomTile2, 0.66, {
        delay: 0.1,
        rotation: 5 + Math.random() * 5,
        x: Math.random() * 10,
        y: Math.random() * -10,
        ease: Back.easeOut,
      });
    },

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;

      tl.to([this.$NespressoCup_01_Left, this.$rightCup, this.$BiscuitsOnPlate_01], 1, {y: -App.height});
      tl.to(this.$introText1, 1, {y: -20, opacity: 0}, '-=1');
      tl.to(this.$introText2, 1, {y: 0, opacity: 1}, '-=0.3');
      tl.to(this.$introText2, 1, {y: -20, opacity: 0}, '+=0.5');
      tl.to(this.$logoApp, 1, {y: -100, opacity: 0}, '-=0.5');
      tl.to(this.$imagesWrapper, 1, {x: '0%', y: '0%'}, '-=0.5');

      this.$tiles.each(function (i, tile) {
        var obj;

        if (tile.id === 'tile-BC') {
          obj = {
            x: 0,
            y: 0,
            zIndex: 50,
            ease: Back.easeOut,
          };
        } else {
          var screenW = App.width - this.tileSize * 1.5;
          var screenH = App.height - this.tileSize * 1.5;
          obj = {
            x: -(screenW / 2) + Math.random() * screenW,
            y: -(screenH / 2) + Math.random() * screenH,
            rotation: (Math.random() > 0.5 ? -1 : 1) * Math.random() * 4,
            ease: Back.easeOut,
          };
        }
        tl.to(tile, 1, obj, '-=0.96');
      }.bind(this));

      tl.staggerTo(this.$tiles.not(this.$introTile), 2, {y: App.height, rotation: 0}, -0.3);

      tl.set(this.$tiles.not(this.$introTile), {display: 'none'});

      tl.to(this.$introTile, 1, {
        // scale: 1.2,
        x: '-50%',
        rotation: '-4',
        ease: Back.easeOut,
      }, '-=0.5');

      tl.add(this.chapterTl);
    },

    updateChapterTimeline: function () {
      this.chapterTl = new TimelineMax();
      var tl = this.chapterTl;

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
    },

    createScrollMagicScenes: function () {
      this.scene = new ScrollMagic.Scene({
        triggerElement: this.el,
        duration: this.duration,
        offset: 0,
        triggerHook: 0,
      })
        // .addIndicators()
        .setPin(this.el)
        .setTween(this.tl)
        .addTo(this.controller);

      // this.chapterScene = new ScrollMagic.Scene({
      //   duration: App.height * 1.5,
      //   triggerElement: this.el,
      //   offset: this.duration,
      //   tweenChanges: true,
      //   triggerHook: 0,
      // })
      //   .addIndicators()
      //   .setPin(this.$el.find('.pin')[0])
      //   .setTween(this.chapterTl)
      //   .addTo(this.controller);
    },

    onResize: function () {
      this.scene.destroy(true);
      this.renderScrollMagic();
    },

  };

  return View;

});