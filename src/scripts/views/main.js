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
      this.$el.html(tpl({
        id: App.id,
        basePath: App.basePath,
      }));

      this.loader = new LoaderView({
        el: document.getElementById(App.id + '-loader'),
        basePath: App.basePath,
        imgPath: App.imgPath,
        imagesToPreload: App.imagesToPreload,
        callback: this.onAssetsLoaded.bind(this),
      });
      this.loader.render().load();

      console.log(App);

      this.setupElements();
    },

    onAssetsLoaded: function () {
      // Scrollmagic
      this.controller = new ScrollMagic.Controller();

      // Refresh sizes BEFORE rendering scenes
      this.onResize();
      this.renderScenes();
      // this.renderGoogleAnalytics();
      // this.renderFacebook();

      setTimeout(function () {
        this.renderMenu();
        // Refresh sizes AFTER rendering scenes
        this.onResize();
        this.setupEvents();
        this.loader.remove();
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

      console.log(scenesData);

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
      var ga = new GAView({
        el: document.getElementById(App.id + '-ga'),
        id: 'UA-0000000-1',
      });
      ga.render();
    },

    // renderFacebook: function() {
    //   // Facebook SDK
    //   (function(d, s, id){
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) {return;}
    //     js = d.createElement(s); js.id = id;
    //     js.src = "//connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    //   }(document, 'script', 'facebook-jssdk'));
    //
    //   // Init
    //   window.fbAsyncInit = function() {
    //     FB.init({
    //       appId      : '741666719251986',
    //       xfbml      : true,
    //       version    : 'v2.7'
    //     });
    //   };
    // },

    setupElements: function () {
      this.$app = this.$el.find('.app');
      this.$fbIcon = this.$el.find('.fb-icon');
      this.$twIcon = this.$el.find('.tw-icon');
    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));

      this.$fbIcon.on(App.click, this.openFacebookPopup.bind(this));
      this.$twIcon.on(App.click, this.openTwitterPopup.bind(this));
    },

    openFacebookPopup: function () {
      var appId = '741666719251986';
      var absolutePath = App.basePath;
      var pageUrl = 'https://labs.theguardian.com/2016/nespresso/history-of-coffee/';
      var title = 'Title here';
      var descr = 'blablabla';
      var image = absolutePath + 'images/share.jpg';
      var w = 520;
      var h = 350;

      console.log(image);

      this.openFbPopup(appId, pageUrl, title, descr, image, w, h);
    },

    openTwitterPopup: function () {

    },

    openFbPopup: function (appId, url, title, descr, image, winWidth, winHeight) {
      var winTop = (screen.height / 2) - (winHeight / 2);
      var winLeft = (screen.width / 2) - (winWidth / 2);
      console.log(winLeft, winTop);
      var fbLink = 'https://www.facebook.com/dialog/share';
      // appId = encodeURIComponent(appId);
      title = encodeURIComponent(title);
      descr = encodeURIComponent(descr);
      url = encodeURIComponent(url);
      image = encodeURIComponent(image);
      var args = '?app_id=' + appId + '&display=popup&title=' + title + '&description=' + descr + '&href=' + url + '&image=' + image;
      console.log(fbLink + args);
      window.open(fbLink + args, '', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    },

    onResize: function () {
      App.container = {
        width: this.$el.width(),
        height: this.$el.height(),
      };

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