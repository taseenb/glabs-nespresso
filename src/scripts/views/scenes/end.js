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
      this.duration = App.height * 8;
      this.parentView = this.options.parentView;

      this.tileBasicRot = 2;

      // Images (scrolling with the background)
      this.images = this.data.images;

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
      this.$link = this.$el.find('.link');


      // Composition images
      this.$composition = this.$el.find('.composition');
      this.$compositionImgs = this.$composition.find('img');
      // this.$cupLeft = this.$composition.find('.NespressoCup_01_Left');
      // this.$cupRight = this.$composition.find('.NespressoCup_01_Right');
      // this.$cookies = this.$composition.find('.Biscuits_01');
      // this.$singleCookie = this.$composition.find('.Biscuits_02_Single');
      // console.log(this.$compositionImgs);

      // console.log(this.$imagesWrapper, this.$tile, this.$body, this.$landmark, this.$title, this.$text);
      // console.log(this.$tiles.length, this.$otherTiles.length);
      this.tilesCount = Math.floor(this.$tiles.length / 2);

      // Select fixed images
      if (this.images) {
        this.$images = [];
        this.images.forEach(function (img, i) {
          var $img = this.$el.find('.' + img.src);
          $img.css(img.css);
          this.$images.push($img);
        }.bind(this));
      }

      // Landmark sizes
      this.$landmarkImg = this.$landmark.find('.img');
      this.$hiddenLandmarkImg = App.loader.$hiddenImages.find('.landmark').filter('.' + this.data.year);
      this.originalLandmarkW = this.$hiddenLandmarkImg[0].width;
      this.originalLandmarkH = this.$hiddenLandmarkImg[0].height;
    },

    setupEvents: function () {
      this.$link.on('click', function() {
        console.log('click');

        window.ga('labsTracker.send', {
          'hitType': 'event',          // Required.
          'eventCategory': 'link',   // Required.
          'eventAction': 'click',      // Required.
          //'eventLabel': $target.data('year'),
        });
      });
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
      var tileRot = (this.tileFrom === 'l' ? this.tileBasicRot : -this.tileBasicRot) * 3;

      this.tileSize = this.$tile1986.width();
      var h = this.landmarkH * 1.1;
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
        top: 0,
        height: h + 'px',
        y: App.height * 0.5 - h / 2, // '-50%',
        x: '-50%',
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
        top: -this.$title.height(),
        opacity: 0,
      });
      TweenMax.set(this.$text, {
        y: -20,
        bottom: -this.$text.height(),
        opacity: 0,
      });

      TweenMax.set(this.$compositionImgs, {
        y: App.height,
        opacity: 0,
      });

      TweenMax.set(this.$link, {
        opacity: 0,
        y: this.tileSize * 0.6,
        x: '-50%', //
      });

      if (this.images) {
        this.images.forEach(function (img, i) {
          TweenMax.set(this.$images[i], {
            x: img.x,
            y: App.height,
          });
        }.bind(this))
      }
    },

    updateChapterTimeline: function () {
      this.chapterTl = new TimelineMax();
      var tl = this.chapterTl;
      // var tileX = this.tileFrom === 'l' ? '-50%' : '50%';
      var tileRot = this.tileFrom === 'l' ? -this.tileBasicRot : this.tileBasicRot;
      // var landmarkX = this.tileFrom === 'l' ? '-10%' : '-90%';

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

      tl.to(this.$tile1986, 0.6, {
        // scale: 1.2,
        x: tileX,
        rotation: tileRot,
        ease: Back.easeOut,
      });

      tl.to(this.$landmark, 0.2, {
        x: landmarkX, // -20,
        y: '-50%',
        rotation: 2,
        ease: Power3.easeOut,
      }, '-=0.2');

      // Move fixed images in
      if (this.images) {
        var tweens = [];
        this.images.forEach(function (img, i) {
          tweens.push(TweenMax.to(this.$images[i], img.duration, {
            y: img.y ?  img.y * App.height : App.height,
          }));
        }.bind(this));
        var imgTl = new TimelineMax({
          align: 'start',
          tweens: tweens,
        }, '-=0.5');
        tl.add(imgTl);
      }

      tl.to(this.$title, 0.6, {
        y: -20,
        opacity: 1,
        rotation: -4 + Math.random() * 4,
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

      tl.set(this.$compositionImgs, {opacity: 1});

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

      tl.to(this.$landmark.add(this.$images[0]), 1, {
        // x: App.width,
        // y: '-50%',
        y: -App.height,
        rotation: 0,
        ease: Power3.easeOut,
      }, '-=0.2');

      // Move fixed images out
      // tl.to(this.$images[0], 1, {y: -App.height}, '-=1');

      tl.to(this.$tile1986, 0.6, {
        x: '0%',
        rotation: 0,
        ease: Back.easeOut,
      });

      tl.to(this.$tile1986End, 0.5, {opacity: 1}, '-=0.2');

      tl.set(this.$otherTiles, {opacity: 1});

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

      tl.to(this.$compositionImgs, 2, {y: 0}, '-=1');

      tl.to(this.$link, 0.6, {opacity: 1, y: '+=20'}, '-=0.3');

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