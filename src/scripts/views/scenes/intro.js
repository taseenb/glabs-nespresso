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
      this.duration = '800%'; // App.height * 5;
      this.parentView = this.options.parentView;
      this.data = this.options.data;

      // Put the intro tile on the left
      this.tileFrom = 'l';

      // Images (scrolling with the background)
      this.images = this.options.data.images;

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
      // this.$BowlBeans_01 = this.$el.find('.BowlBeans_01');
      this.$imagesWrapper = this.$el.find('.images-wrapper');
      this.$tiles = this.$imagesWrapper.find('.tile');
      this.$introTile = this.$tiles.filter('#tile-BC');
      this.$body = this.$el.find('.body');
      this.$introText = this.$body.find('.intro-text');
      this.$logoApp = this.$body.find('.logo-app');
      // this.$introText1 = this.$introText.find('.inner-1');
      // this.$introText2 = this.$introText.find('.inner-2');
      this.$landmark = this.$el.find('.landmark');
      this.$title = this.$body.find('.title');
      this.$text = this.$body.find('.text');
      this.$scrollIcon = this.$el.find('.scroll-icon');

      // Select fixed images
      if (this.images) {
        this.$images = [];
        this.images.forEach(function (img, i) {
          var $img = this.$el.find('.' + img.src);
          $img.css(img.css);
          this.$images.push($img);
        }.bind(this));
      }

      // Get 2 random tiles (except the intro tile)
      this.tilesCount = Math.floor(this.$tiles.length / 2);
      var rndIdx1 = Math.floor(Math.random() * this.tilesCount);
      var rndIdx2 = this.tilesCount + Math.floor(Math.random() * this.tilesCount);
      this.$randomTile1 = this.$tiles.not(this.$introTile)[rndIdx1];
      this.$randomTile2 = this.$tiles.not(this.$introTile)[rndIdx2];

      // Landmark sizes
      this.$landmarkImg = this.$landmark.find('.img');
      this.$hiddenLandmarkImg = App.loader.$hiddenImages.find('.landmark').filter('.' + this.data.year);
      this.originalLandmarkW = this.$hiddenLandmarkImg[0].width;
      this.originalLandmarkH = this.$hiddenLandmarkImg[0].height;
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

    updateLandmark: function () {
      var origW = this.originalLandmarkW;
      var origH = this.originalLandmarkH;

      this.landmarkSize = this.parentView.updateLandmarkSize(origW, origH);
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
      var h = this.landmarkH * 1.1;
      this.tilesY = App.height * 0.5 - this.tileSize * 0.5;

      // console.log(this.tileSize);

      // TweenMax.set(this.$BowlBeans_01, {x:'-40%', y: App.height});
      TweenMax.set(this.$body, {
        height: h + 'px',
        x: '-50%',
        y: App.height * 0.5 - h / 2,
      });
      TweenMax.set(this.$title, {y: 20, opacity: 0, top: -this.$title.height(),});
      TweenMax.set(this.$text, {y: -20, opacity: 0, bottom: -this.$text.height()});
      TweenMax.set(this.$landmark, {x: App.width, y: '-50%', opacity: 1});
      TweenMax.set(this.$imagesWrapper, {x: '0%', y: '0%'});
      TweenMax.set(this.$imagesWrapper, {x: '-36%', y: '0%'});

      TweenMax.set(this.$tiles, {x: 0, y: this.tilesY, rotation: 0});
      TweenMax.set(this.$NespressoCup_01_Left, {y: App.height * 0.14});
      TweenMax.set(this.$rightCup, {y: App.height * 0.25});
      TweenMax.set(this.$BiscuitsOnPlate_01, {y: 0});


      // Place fixed images
      if (this.images) {
        this.images.forEach(function (img, i) {
          TweenMax.set(this.$images[i], {
            x: img.x,
            y: App.height,
          });
        }.bind(this));
      }

      // Animate 2 random tiles
      TweenMax.to(this.$randomTile1, 0.66, {
        rotation: -5 + Math.random() * -5,
        x: Math.random() * -10,
        y: this.tilesY + Math.random() * 10,
        ease: Back.easeOut,
      });
      TweenMax.to(this.$randomTile2, 0.66, {
        delay: 0.1,
        rotation: 5 + Math.random() * 5,
        x: Math.random() * 10,
        y: this.tilesY + Math.random() * -10,
        ease: Back.easeOut,
      });
    },

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;

      tl.to([this.$NespressoCup_01_Left, this.$rightCup, this.$BiscuitsOnPlate_01], 3, {y: -App.height});

      tl.to(this.$scrollIcon, 1, {opacity: 0}, '-=1');

      tl.to(this.$introText, 1, {y: -20, opacity: 0}, '-=1');
      tl.to(this.$logoApp, 1, {y: -100, opacity: 0}, '-=0.5');

      tl.to(this.$imagesWrapper, 1, {x: '0%', y: '0%'}, '-=0.5');

      tl.to(this.el, 0, {css: {className: '+=dark'}});

      var tilesX = [];

      this.$tiles.each(function (i, tile) {
        var obj;

        if (tile.id === 'tile-BC') {
          obj = {
            x: 0,
            y: this.tilesY, // App.height * 0.5,
            zIndex: 50,
            ease: Back.easeOut,
          };
        } else {
          var screenW = App.width - this.tileSize * 1.5;
          var screenH = App.height - this.tileSize * 1.5;
          var tileX = -(screenW / 2) + Math.random() * screenW;
          obj = {
            x: tileX,
            y: Math.random() * screenH,
            rotation: (Math.random() > 0.5 ? -1 : 1) * Math.random() * 4,
            ease: Back.easeOut,
          };

          tilesX.push(tileX);
        }

        tl.to(tile, 1, obj, '-=0.96');
      }.bind(this));

      // Move tiles off screen in all direction (except top)
      this.$tiles.not(this.$introTile).each(function (i, tile) {
        var s = this.tileSize * Math.random();
        var x = App.width + Math.random() * this.tileSize / 2;
        var y = -s / 2 + this.tileSize;
        var duration = 2.5;
        var pos = i > 0 ? '-=2' : null;

        // console.log(tilesX[i]);

        if (tilesX[i] < -this.tileSize * 0.5) {
          x = -x;
        } else if (tilesX[i] > this.tileSize * 0.5) {
          // x = x;
        } else {
          x = -s + this.tileSize;
          y = App.height;
        }

        var obj = {
          x: '+=' + x,
          y: '+=' + y,
          rotation: 0,
          ease: Back.easeIn,
        };

        tl.to(tile, duration, obj, pos);
      }.bind(this));

      // tl.staggerTo(this.$tiles.not(this.$introTile), 2, {y: App.height * 1.5, rotation: 0}, -0.3);

      tl.set(this.$tiles.not(this.$introTile), {display: 'none'});

      tl.add(this.chapterTl);

      // tl.to(this.$BowlBeans_01, 7, {y: -App.height + this.$BowlBeans_01.height() / 2}, '-=3');
    },

    updateChapterTimeline: function () {
      this.chapterTl = new TimelineMax();
      var tl = this.chapterTl;

      // Landmark X position
      var landmarkX = 0; //'-50%';
      if (this.tileFrom === 'l') {
        landmarkX = -(1 * this.landmarkW / 3);
      } else {
        landmarkX = -(2 * this.landmarkW / 3);
      }

      // Tile X position
      var tileX = 0;
      if (this.tileFrom === 'l') {
        tileX = -(this.landmarkW / 3) - (this.tileSize * 0.25);
      } else {
        tileX = (this.landmarkW / 3) + (this.tileSize * 0.25);
      }

      tl.to(this.$introTile, 2, {
        // scale: 1.2,
        x: tileX, //'-50%',
        rotation: '-4',
        ease: Back.easeOut,
      }, '-=0.5');

      tl.to(this.$landmark, 1, {
        x: landmarkX, //-20,
        y: '-50%',
        rotation: 2,
        ease: Power3.easeOut,
      }, '-=0.2');


      // Animate fixed images
      if (this.images) {
        var tweens = [];
        this.images.forEach(function (img, i) {
          tweens.push(TweenMax.to(this.$images[i], img.duration, {
            y: img.y ? img.y * App.height : App.height,
          }));
        }.bind(this));
        var imgTl = new TimelineMax({
          align: 'start',
          tweens: tweens,
        }, '-=0.5');
        tl.add(imgTl);
      }

      tl.to(this.$title, 1.2, {
        y: -20,
        opacity: 1,
        rotation: -4 + Math.random() * 4,
        ease: Power3.easeOut,
      });

      tl.to(this.$text, 1.2, {
        y: 20,
        opacity: 1,
        ease: Power3.easeOut,
      }, '-=0.6');
    },

    createScrollMagicScenes: function () {
      // var guardianHeaderHeight = App.guardianHeader;

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
    },

    onResize: function () {
      // console.log(this.$el.offset().top);

      this.$el.height(App.height);

      this.scene.destroy(true);
      this.renderScrollMagic();
    },

  };

  return View;

});