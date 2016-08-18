define(function (require) {

  var $ = require('jquery');
  var App = require('global');

  // Scrollmagic
  var ScrollMagic = require('ScrollMagic');
  require('ScrollMagicAnimation');
  require('ScrollMagicIndicators');

  // Data
  var scenesData = require('../data/scenes');

  // Views
  var SceneView = require('./scene');
  var LoaderView = require('./loader');
  var MenuView = require('./menu');
  var GAView = require('./google-analytics');

  // Templates
  var tpl = require('hbs!../tpl/main');
  var scenesTpl = {
    intro: require('hbs!../tpl/scenes/intro'),
    chapter: require('hbs!../tpl/scenes/chapter'),
    end: require('hbs!../tpl/scenes/end'),
  };

  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function () {

    },

    render: function () {

      App.guardianHeader = this.$el.offset().top;

      this.$el
        .html(tpl({
          id: App.id,
          basePath: App.basePath,
        }))
        .css({
          backgroundImage: 'url(' + App.basePath + App.imgPath + 'Background02.jpg)',
          height: App.height - App.guardianHeader,
        });

      App.loader = new LoaderView({
        el: document.getElementById(App.id + '-loader'),
        basePath: App.basePath,
        imgPath: App.imgPath,
        imagesToPreload: App.imagesToPreload,
        callback: this.onAssetsLoaded.bind(this),
      });
      App.loader.render();

      setTimeout(function () {
        App.loader.load();
      }.bind(this), 250);

      this.setupElements();
    },

    onAssetsLoaded: function () {
      // Scrollmagic
      this.controller = new ScrollMagic.Controller();

      // Refresh sizes BEFORE rendering scenes
      this.onResize();
      this.renderScenes();
      this.renderGoogleAnalytics();

      setTimeout(function () {
        this.renderMenu();
        // Refresh sizes AFTER rendering scenes
        this.onResize();
        this.setupEvents();
        App.loader.remove();

        this.$el.css('height', '');
      }.bind(this), 500);
    },

    renderMenu: function () {
      this.menu = new MenuView({
        el: document.getElementById(App.id + '-menu'),
        parentView: this,
      });
      this.menu.render();

      setTimeout(function () {
        this.menu.initMenuAutoUpdater();
      }.bind(this), 500);
    },

    renderScenes: function () {
      this.scenes = [];

      // console.log(scenesData);

      scenesData.forEach(function (s) {

        // Scene
        var scene = new SceneView({
          controller: this.controller,
          data: s,
          tpl: scenesTpl[s.type],
          $parent: this.$app,
          scenesData: scenesData,
          basePath: App.basePath,
        });
        scene.render();

        this.scenes.push(scene);

      }.bind(this));
    },

    renderGoogleAnalytics: function () {
      this.ga = new GAView({
        el: document.getElementById(App.id + '-ga'),
        id: App.info.googleAnalyticsId,
      });
      this.ga.render();
    },

    setupElements: function () {
      this.$app = this.$el.find('.app');
      this.$fbIcon = this.$el.find('.fb-icon');
      this.$twIcon = this.$el.find('.tw-icon');

      this.$nespressoLogo = this.$el.find('.nespresso-logo');
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));

      this.$fbIcon.on(App.click, this.openFacebookPopup.bind(this));
      this.$twIcon.on(App.click, this.openTwitterPopup.bind(this));
    },

    openFacebookPopup: function () {
      var appId = App.info.facebookAppId;
      var absolutePath = App.basePath;
      var pageUrl = App.info.pageUrl;
      var title = App.info.facebookTitle;
      var descr = App.info.facebookText;
      var image = absolutePath + 'images/share.jpg';
      var w = 520;
      var h = 350;

      var fbLink = 'https://www.facebook.com/dialog/share';
      title = encodeURIComponent(title);
      descr = encodeURIComponent(descr);
      image = encodeURIComponent(image);
      var args = '?app_id=' + appId + '&display=popup&title=' + title + '&description=' + descr + '&picture=' + image + '&href=' + pageUrl;

      this.openPopup(fbLink + args, w, h);
    },

    openTwitterPopup: function () {
      // https://twitter.com/intent/tweet
      var text = App.info.twitterText;
      var pageUrl = App.info.pageUrl;
      var w = 520;
      var h = 280;

      var args = '?text=';
      args += encodeURIComponent(text);
      args += '&url=' + pageUrl;

      this.openPopup('https://twitter.com/intent/tweet' + args, w, h);
    },

    openPopup: function (content, w, h) {
      var top = (screen.height / 2) - (h / 2);
      var left = (screen.width / 2) - (w / 2);
      window.open(content, '', 'top=' + top + ',left=' + left + ',toolbar=0,status=0,width=' + w + ',height=' + h);
    },

    onResize: function () {
      App.container = {
        width: this.$app.width(),
        height: this.$app.height(),
      };

      App.guardianHeader = this.$el.offset().top;

      // console.log(App.container.width, App.width, App.height); //

      if (this.scenes) {
        this.scenes.forEach(function (s) {
          if (s.onResize) {
            s.onResize();
          }
        });
      }

      if (this.controller) {
        setTimeout(function () {
          this.controller.update(true);
        }.bind(this), 200);
      }
    },

  };

  return View;

});