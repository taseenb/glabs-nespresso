define(function (require) {

  'use strict';

  var $ = require('jquery');
  var Mediator = require('mediator-js');
  var App = require('global');
  var Resize = require('./events/resize');

  // Blast
  require('blast-text');

  // Initialize
  function initialize(el, root) {
    App.el = el;
    App.root = root;

    // App Info - GA + Facebook / Twitter + Page url
    App.info = require('./data/info');

    // Images path and images to preload
    App.basePath = App.root;
    App.imgPath = 'images/';
    App.imagesToPreload = require('./data/images-to-preload');

    // Mediator
    App.mediator = new Mediator();

    // Resize event
    var resize = new Resize();
    resize.onResize();

    // Support - Device
    App.isTouch = 'ontouchstart' in window;
    App.isPhone = App.isTouch && (App.width < 740 || App.height < 740);
    App.click = App.isTouch ? 'touchstart' : 'click';

    // App ID - Set an unique name here
    App.id = 'nespresso-interactive';
    var version = App.isPhone ? 'mobile' : 'desktop';
    $(App.el).html('<div id="' + App.id + '" class="' + version + '-version"></div>');

    // Render main view
    var MainView;
    if (App.isPhone) {
      MainView = require('./mobile-views/main');
    } else {
      MainView = require('./views/main');
    }
    App.mainView = new MainView({
      el: document.getElementById(App.id),
    });
    App.mainView.render();

  }

  return {
    init: initialize,
  };

});