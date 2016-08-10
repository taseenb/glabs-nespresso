define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TweenMax = require('TweenMax');

  // Data
  var scenesData = require('../data/scenes');

  // GSAP ScrollTo Plugin
  require('ScrollToPlugin');

  // Template
  var tpl = require('hbs!../tpl/menu');


  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.parentView = this.options.parentView;

      App.mainView.controller.scrollTo(function (newpos, options) {
        var d = options.duration || 0;
        TweenMax.to(window, d, {
          scrollTo: {y: newpos},
          onComplete: function () {
            if (_.isFunction(options.onComplete)) {
              options.onComplete();
            }
          },
          ease: Cubic.easeInOut,
        });
      });

      // console.log(App.mainView.controller);
    },

    render: function () {
      this.$el.html(tpl({
        scene: scenesData,
        basePath: App.basePath,
      }));

      this.setupElements();
      this.setupEvents();

      return this;
    },

    setupElements: function () {
      this.$items = this.$el.find('.item');
      this.itemsCount = this.$items.length;
    },

    setupEvents: function () {
      this.$items.on(App.click, this.onClick.bind(this));
      // App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onClick: function (e) {
      var idx = $(e.currentTarget).data('idx');

      if (idx === this.currentIdx) {
        return;
      } else {
        // this.$items.removeClass('active');
        this.$items.removeClass('active').eq(idx).addClass('active');
      }

      var scrollHeight = $(App.el).height();
      var sceneContainer = App.mainView.scenes[idx];
      var scrollMagicScene = sceneContainer.sceneView.scene;
      var scrollY = this.getScrollY(scrollMagicScene, idx);
      var maxDuration = 6;
      var minDuration = 0.8;
      var currentScrollY = App.mainView.controller.info('scrollPos');
      var distance = Math.abs(currentScrollY - scrollY);
      var normalizedDistance = distance / scrollHeight;
      var duration = maxDuration * normalizedDistance;
      duration = duration < minDuration ? minDuration : duration;

      App.mainView.controller.scrollTo(scrollY, {
        duration: duration,
        onComplete: this.onScrollComplete.bind(this)
      });

      this.currentIdx = idx;
    },

    getCurrentSceneIdx: function(y) {
      var idx = 0;
      var offsets = [];
      var scenes = App.mainView.scenes;
      scenes.forEach(function(sceneContainer) {
        var scrollMagicScene = sceneContainer.sceneView.scene;
        offsets.push(scrollMagicScene.scrollOffset());
      });

      offsets.forEach(function(offset, i) {
        if (offset < y) {
          idx = i;
        }
      });

      // console.log(idx, offsets);

      return idx;
    },

    updateActiveItem: function(scrollPosition) {
      var idx = this.getCurrentSceneIdx(scrollPosition);
      this.$items.removeClass('active').eq(idx).addClass('active');
    },

    getScrollY: function(scrollMagicScene, idx) {
      var scrollOffset = scrollMagicScene.scrollOffset();
      var sceneDuration = scrollMagicScene.duration() - 20;

      // If it's the last scene, don't go to the end
      // Get the position of the landmark composition
      if (idx === this.itemsCount - 1) {
        sceneDuration = scrollMagicScene.duration() * 0.29;
      }

      return scrollOffset + sceneDuration;
    },

    onScrollComplete: function () {
      // console.log(App.mainView.controller.info());
      // var scrollPosition = App.mainView.controller.scrollPos();
      // this.updateActiveItem(scrollPosition);
    },

    onResize: function() {
      // this.scrollHeight = $(App.el).outerHeight();
    },

  };

  return View;

});