define(function (require) {

  var $ = require('jquery');
  var App = require('global');

  var tpl = require('hbs!../tpl/google-analytics');

  function View(options) {
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
    this.initialize();
  }

  View.prototype = {

    initialize: function() {
      this.id = this.options.id;
    },

    render: function() {
      this.$el.html(tpl({
        id: this.id,
      }));
    },

  };

  return View;

});

