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
      this.duration = '500%';
      this.parentView = this.options.parentView;

      // Images (scrolling with the background)
      this.images = this.data.images;

      this.tileBasicRot = 2;

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

    },

    updateLandmark: function () {
      var origW = this.originalLandmarkW;
      var origH = this.originalLandmarkH;

      this.landmarkSize = this.parentView.updateLandmarkSize(origW, origH);
      this.landmarkW = this.landmarkSize.width;
      this.landmarkH = this.landmarkSize.height;
      this.landmarkIsPortrait = this.landmarkSize.isPortrait;
    },

    updatePositions: function () {
      var tileDir = this.tileFrom === 'l' ? -1 : 1;
      var tileRot = (this.tileFrom === 'l' ? this.tileBasicRot : -this.tileBasicRot) * 4;

      this.tileSize = this.$tile.width();
      var h = this.landmarkH * 1.1;
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
        top: -this.$title.height(),
        opacity: 0,
      });
      TweenMax.set(this.$text, {
        y: -20,
        bottom: -this.$text.height(),
        opacity: 0,
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

    updateTimeline: function () {
      this.tl = new TimelineMax();
      var tl = this.tl;
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

      tl.to(this.$tile, 2, {
        // scale: 1.2,
        x: tileX,
        rotation: tileRot,
        ease: Back.easeOut,
      });

      tl.to(this.$landmark, 1, {
        x: landmarkX,
        y: '-50%',
        rotation: -1 * tileRot,
        ease: Power3.easeOut,
      }, '-=0.2');


      // Images TL
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
        delay: 0.6,
        y: -20,
        opacity: 1,
        rotation: -4 + Math.random() * 4,
        ease: Power3.easeOut,
      });

      tl.to(this.$text, 1.2, {
        y: 20,
        opacity: 1,
        ease: Power3.easeOut,
      }, '+=0.6');

      // tl.to(this.$tile, 3, {});

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