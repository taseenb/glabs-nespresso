define(function (require) {

  'use strict';

  var $ = require('jquery');
  var Mediator = require('mediator-js');
  var App = require('global');
  var Resize = require('./events/resize');

  // Initialize
  function initialize(el, root) {
    App.el = el;
    App.root = root;

    // App ID - Set an unique name here
    App.id = 'nespresso-interactive';
    $(App.el).html('<div id="' + App.id + '"></div>');

    // Images path and images to preload
    App.imgPath = 'images/';
    App.imagesToPreload = require('./data/images-to-preload');

    // Support - Device
    App.isTouch = 'ontouchstart' in window;
    App.isPhone = App.isTouch && (App.width < 740 || App.height < 740);
    App.click = App.isTouch ? 'touchstart' : 'click';

    // Mediator
    App.mediator = new Mediator();

    // Resize event
    var resize = new Resize();
    resize.onResize();

    // Render main view
    var MainView = require('./views/main');
    var mainView = new MainView({el: document.getElementById(App.id)});
    mainView.render();
  }

  return {
    init: initialize,
  };

});