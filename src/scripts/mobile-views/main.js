define(function (require) {

  var $ = require('jquery');
  var App = require('global');

  // Data
  var scenesData = require('../data/mobile-scenes');

  // Templates
  var tpl = require('hbs!../tpl/mobile/main');

  // Vendor
  var Swiper = require('swiper');


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
        scenes: scenesData,
      }));

      this.setupElements();
      this.setupEvents();

      // this.renderMenu();
      // this.renderScenes();

      this.swiper = new Swiper(this.$swiperContainer, {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true,
      });
    },

    // renderMenu: function () {
    //   this.menu = new MenuView({
    //     el: document.getElementById(App.id + '-menu'),
    //     parentView: this,
    //   });
    //   this.menu.render();
    //
    //   setTimeout(function () {
    //     this.menu.initMenuAutoUpdater();
    //   }.bind(this), 500);
    // },

    renderScenes: function () {
      this.scenes = [];

      scenesData.forEach(function (s) {

      }.bind(this));
    },

    renderGoogleAnalytics: function () {
      var ga = new GAView({
        el: document.getElementById(App.id + '-ga'),
        id: App.info.googleAnalyticsId,
      });
      ga.render();
    },

    setupElements: function () {
      this.$app = this.$el.find('.app');
      this.$fbIcon = this.$el.find('.fb-icon');
      this.$twIcon = this.$el.find('.tw-icon');

      this.$swiperContainer = this.$app.find('.swiper-container');
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

    openPopup: function(content, w, h) {
      var top = (screen.height / 2) - (h / 2);
      var left = (screen.width / 2) - (w / 2);
      window.open(content, '', 'top=' + top + ',left=' + left + ',toolbar=0,status=0,width=' + w + ',height=' + h);
    },

    onResize: function () {
      App.container = {
        width: this.$el.width(),
        height: this.$el.height(),
      };
    },

  };

  return View;

});