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

    /**
     * Only call the autoupdater when all the application is ready.
     */
    initMenuAutoUpdater: function () {
      this.onResize();
      setTimeout(this.checkPositionRecursive.bind(this), 1000);
    },

    setupElements: function () {
      this.$items = this.$el.find('.item');
      this.itemsCount = this.$items.length;
    },

    setupEvents: function () {
      this.$items.on(App.click, this.onClick.bind(this));
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    onClick: function (e) {
      var idx = $(e.currentTarget).data('idx');
      var isIntro = parseInt(idx, 10) === -1;

      console.log(isIntro);

      if (idx === this.currentIdx) {
        return;
      } else {
        // this.$items.removeClass('active');
        var itemIdx = isIntro ? 0 : idx + 1;
        this.$items.removeClass('active').eq(itemIdx).addClass('active');
      }

      this.scrolling = true;

      var scrollY = 0;

      if (!isIntro) {
        var sceneContainer = App.mainView.scenes[idx];
        var scrollMagicScene = sceneContainer.sceneView.scene;
        scrollY = this.getScrollY(scrollMagicScene, idx);
      }

      var scrollHeight = $(App.el).height();
      var maxDuration = 6;
      var minDuration = 0.8;
      var currentScrollY = App.mainView.controller.scrollPos();
      var distance = Math.abs(currentScrollY - scrollY);
      var normalizedDistance = distance / scrollHeight;
      var duration = maxDuration * normalizedDistance;
      duration = duration < minDuration ? minDuration : duration;

      console.log(duration);

      App.mainView.controller.scrollTo(scrollY, {
        duration: duration,
        onComplete: this.onScrollComplete.bind(this),
      });

      this.currentIdx = isIntro ? -1 : idx;
    },

    getCurrentSceneIdx: function (y) {
      var idx = 0;

      this.offsets.forEach(function (offset, i) {
        if (offset < y) {
          idx = i;
        }
      });

      return idx;
    },

    updateActiveItem: function (scrollPosition) {
      var idx = this.getCurrentSceneIdx(scrollPosition);
      var itemIdx = idx + 1;

      if (idx === 0) {
        var sceneContainer = App.mainView.scenes[0];
        var introScene = sceneContainer.sceneView.scene;

        if (scrollPosition < introScene.duration() * 0.45) {
          itemIdx = 0;
        }

      }

      this.$items.removeClass('active').eq(itemIdx).addClass('active');
    },

    getScrollY: function (scrollMagicScene, idx) {
      var scrollOffset = scrollMagicScene.scrollOffset();
      var sceneDuration = scrollMagicScene.duration() - 20;

      // If it's the last scene, don't go to the end
      // Get the position of the landmark composition
      if (idx + 1 === this.itemsCount - 1) {
        sceneDuration = scrollMagicScene.duration() * 0.29;
      }

      return scrollOffset + sceneDuration;
    },

    onScrollComplete: function () {
      this.scrolling = false;
      // console.log(App.mainView.controller.info());
      // var scrollPosition = App.mainView.controller.scrollPos();
      // this.updateActiveItem(scrollPosition);
    },

    checkPositionRecursive: function () {
      if (!this.scrolling) {
        var scrollPos = App.mainView.controller.scrollPos();
        this.updateActiveItem(scrollPos);
      }

      setTimeout(this.checkPositionRecursive.bind(this), 500);
    },

    onResize: function () {
      // this.scrollHeight = $(App.el).outerHeight();

      this.offsets = [];
      var scenes = App.mainView.scenes;
      scenes.forEach(function (sceneContainer) {
        var scrollMagicScene = sceneContainer.sceneView.scene;
        this.offsets.push(scrollMagicScene.scrollOffset());
      }.bind(this));
    },

  };

  return View;

});