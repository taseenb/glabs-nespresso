define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');
  var ScrollMagic = require('ScrollMagic');

  // Elements
  var $NespressoCup_01_Left;
  var $rightCup;
  var $BiscuitsOnPlate_01;
  var $imagesWrapper;
  var $tiles;
  var $introTile;
  var $body;
  var $introText;
  var $logoApp;
  var $introText1, $introText2;
  var $randomTile1, $randomTile2;
  var tilesCount;
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
      this.id = this.options.id;
      this.controller = this.options.controller;
      this.duration = App.height * 5;

      return this;
    },

    render: function () {
      this.setupElements(this.$el);

      this.renderScrollMagic();

      this.setupEvents();

      return this;
    },

    setupElements: function ($el) {
      $NespressoCup_01_Left = $el.find('.NespressoCup_01_Left');
      $rightCup = $el.find('.right-cup');
      $BiscuitsOnPlate_01 = $el.find('.BiscuitsOnPlate_01');
      $imagesWrapper = $el.find('.images-wrapper');
      $tiles = $imagesWrapper.find('.tile');
      $introTile = $tiles.filter('#tile-BC');
      $body = $el.find('.body');
      $introText = $body.find('.intro-text');
      $logoApp = $body.find('.logo-app');
      $introText1 = $introText.find('.inner-1');
      $introText2 = $introText.find('.inner-2');
      $landmark = $el.find('.landmark');
      $title = $body.find('.title');
      $text = $body.find('.text');

      // Get 2 random tiles (except the intro tile)
      tilesCount = Math.floor($tiles.length / 2);
      var rndIdx1 = Math.floor(Math.random() * tilesCount);
      var rndIdx2 = tilesCount + Math.floor(Math.random() * tilesCount);
      $randomTile1 = $tiles.not($introTile)[rndIdx1];
      $randomTile2 = $tiles.not($introTile)[rndIdx2];

      // console.log($tiles, tilesCount, rndIdx1, rndIdx1, $randomTile1, $randomTile2);
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    renderScrollMagic: function () {
      // this.renderTextAnimation();
      this.updatePositions();
      this.updateChapterTimeline();
      this.updateTimeline();
      this.createScrollMagicScenes();
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
      TweenMax.set($title, {y: 20, opacity: 0});
      TweenMax.set($text, {y: -20, opacity: 0});
      TweenMax.set($landmark, {x: App.width, y: '-50%', opacity: 1});
      TweenMax.set($tiles, {x: 0, y: 0, rotation: 0});
      TweenMax.set($imagesWrapper, {x: '0%', y: '0%'});
      TweenMax.set($imagesWrapper, {x: '-32%', y: '-20%'});

      // Animate 2 random tiles
      TweenMax.to($randomTile1, 0.66, {
        rotation: -5 + Math.random() * -5,
        x: Math.random() * -10,
        y: Math.random() * 10,
        ease: Back.easeOut,
      });
      TweenMax.to($randomTile2, 0.66, {
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
      var tileSize = $tiles.eq(0).width();

      tl.to([$NespressoCup_01_Left, $rightCup, $BiscuitsOnPlate_01], 1, {y: -App.height});
      tl.to($introText1, 1, {y: -20, opacity: 0}, '-=1');
      tl.to($introText2, 1, {y: 0, opacity: 1}, '-=0.3');
      tl.to($introText2, 1, {y: -20, opacity: 0}, '+=0.5');
      tl.to($logoApp, 1, {y: -100, opacity: 0}, '-=0.5');
      tl.to($imagesWrapper, 1, {x: '0%', y: '0%'}, '-=0.5');

      $tiles.each(function (i, tile) {
        var obj;

        if (tile.id === 'tile-BC') {
          obj = {
            x: 0,
            y: 0,
            zIndex: 50,
            ease: Back.easeOut,
          };
        } else {
          var screenW = App.width - tileSize * 1.5;
          var screenH = App.height - tileSize * 1.5;
          obj = {
            x: -(screenW / 2) + Math.random() * screenW,
            y: -(screenH / 2) + Math.random() * screenH,
            rotation: (Math.random() > 0.5 ? -1 : 1) * Math.random() * 4,
            ease: Back.easeOut,
          };
        }
        tl.to(tile, 1, obj, '-=0.96');
      }.bind(this));

      tl.staggerTo($tiles.not($introTile), 2, {y: App.height, rotation: 0}, -0.3);

      tl.set($tiles.not($introTile), {display: 'none'});

      tl.to($introTile, 1, {
        scale: 1.3,
        x: '-50%',
        rotation: '-7',
        ease: Back.easeOut,
      }, '-=0.5');

      tl.add(this.chapterTl);
    },

    updateChapterTimeline: function () {
      this.chapterTl = new TimelineMax();
      var tl = this.chapterTl;

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

      // tl.set($text, {opacity: 1, y: 20});
      // tl.add(this.textTl);

      tl.to($text, 0.6, {
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