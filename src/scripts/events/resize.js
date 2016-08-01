define(function (require) {

  'use strict';

  var _ = require('underscore');
  var $ = require('jquery');
  var App = require('global');

  function Event() {
    this.initialize();
  }

  Event.prototype = {

    initialize: function () {
      this.callback = _.debounce(this.onResize, 100).bind(this);

      window.addEventListener('resize', this.callback);

      this.$win = $(window);
    },

    updateScreenSize: function () {
      App.width = this.$win.width();
      App.height = this.$win.height();
    },

    onResize: function () {
      this.updateScreenSize();

      App.mediator.publish('resize', {
        width: App.width,
        height: App.height,
      });
    },

  };

  return Event;

});
