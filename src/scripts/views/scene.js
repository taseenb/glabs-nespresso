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
      this.mainView = this.options.mainView;

      // Scene data
      this.id = this.data.id;
      this.type = this.data.type;
      this.year = this.data.year;
      this.contentTpl = this.data.contentTpl;
    },

    render: function () {
      var tplOptions = {
        id: 'scene-' + this.id,
        type: this.type,
        year: this.data.year,
        title: this.data.title,
        copy: this.data.copy,
        basePath: App.basePath,
        images: this.data.images,
      };

      if (this.type === 'chapter') {
        // tplOptions.content = this.contentTpl({
        //
        // });
        // tplOptions.images = this.data.images;
      } else {
        var scenesDataClone = _.clone(this.scenesData);
        // Add intro element (BC image)
        scenesDataClone.unshift({
          id: this.year,
          year: this.year,
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

    },

    updateLandmarkSize: function (w, h) {
      var maxH = App.height * 0.4;
      var maxW = App.container.width * 0.4;
      this.landmarkIsPortrait = w < h;

      if (this.landmarkIsPortrait) {
        this.landmarkH = maxH;
        this.landmarkW = w * (maxH / h);
        if (this.landmarkW > maxW) {
          this.landmarkW = maxW;
          this.landmarkH = h * (maxW / w);
        }
      } else {
        this.landmarkW = maxW;
        this.landmarkH = h * (maxW / w);
        if (this.landmarkH > maxH) {
          this.landmarkH = maxH;
          this.landmarkW = w * (maxH / h);
        }
      }

      // console.log(this.landmarkW,this.landmarkH);

      return {
        isPortrait: this.landmarkIsPortrait,
        width: this.landmarkW,
        height: this.landmarkH,
      };
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
        id: 'sceneView-' + this.data.id,
        basePath: App.basePath,
        parentView: this,
      });
      this.sceneView.render();
    },

    onResize: function () {
      if (this.sceneView && this.sceneView.onResize) {
        this.sceneView.onResize();
      }
    },

  };

  return View;

});