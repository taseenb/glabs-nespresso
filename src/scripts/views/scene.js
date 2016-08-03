define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var App = require('global');
  var TweenMax = require('TweenMax');

  var SceneViews = {
    intro: require('./scenes/intro'),
    chapter: require('./scenes/chapter'),
    end: require('./scenes/end'),
  };


  function View(options) {
    this.options = options;
    this.initialize();
  }

  View.prototype = {

    initialize: function () {
      this.data = this.options.data;
      this.tpl = this.options.tpl;
      this.$parent = this.options.$parent;
      this.scenesData = this.options.scenesData;
      this.controller = this.options.controller;

      this.scrollMagicScene = null;

      // Scene data
      this.id = this.data.id;
      this.type = this.data.type;
      this.contentTpl = this.data.contentTpl;
    },

    render: function () {
      var tplOptions = {
        id: 'scene-' + this.id,
        type: this.type,
        year: this.data.year,
        title: this.data.title,
        copy: this.data.copy,
      };

      if (this.type === 'chapter') {
        // tplOptions.content = this.contentTpl({
        //   id: 'yoyo-' + this.id,
        //   year: this.data.year,
        // });
      } else if (this.type === 'intro') {
        var scenesDataClone = _.clone(this.scenesData);
        // Add intro element (BC image)
        scenesDataClone.unshift({
          id: 'BC',
          year: 'BC',
          chapter: true,
        });
        tplOptions.tiles = _.shuffle(scenesDataClone);
        tplOptions.introCopy1 = this.data.introCopy1;
        tplOptions.introCopy2 = this.data.introCopy2;
      }

      // Append template content
      this.$parent.append(this.tpl(tplOptions));

      // Update the element of the view
      this.$el = $('#scene-' + this.id);
      this.el = this.$el[0];

      this.setupElements();
      this.setupEvents();

      setTimeout(function () {
        this.createSceneView();
      }.bind(this), 0);

      return this;
    },

    setupElements: function () {

    },

    setupEvents: function () {
      App.mediator.subscribe('resize', this.onResize.bind(this));
    },

    /**
     * Initializes specific scene elements (depending on the scene type)
     * and creates ScrollMagic scenes.
     */
    createSceneView: function () {
      this.sceneView = new SceneViews[this.data.type]({
        controller: this.controller,
        data: this.data,
        el: this.el,
      });
      this.sceneView.render();

    },

    onResize: function () {

    },

  };

  return View;

});