define(function (require) {

  var ScrollMagic = require('ScrollMagic');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');

  // Elements
  var $NespressoCup_01_Left;
  var $rightCup;
  var $BiscuitsOnPlate_01;
  var $tiles;
  var $introTile;
  var $body;
  var $text;
  var $logoApp;

  function setupElements($el) {
    $NespressoCup_01_Left = $el.find('.NespressoCup_01_Left');
    $rightCup = $el.find('.right-cup');
    $BiscuitsOnPlate_01 = $el.find('.BiscuitsOnPlate_01');
    $tiles = $el.find('.tile');
    $introTile = $el.find('#tile-BC');
    $body = $el.find('.body');
    $text = $body.find('.text');
    $logoApp = $body.find('.logo-app');
  }

  return function (options) {
    setupElements(options.$el);

    var tl = new TimelineMax();
    var duration = App.height * 3;
    var tilesCount = $tiles.length;
    var $randomTile1 = $tiles[Math.floor(Math.random() * tilesCount)];
    var $randomTile2 = $tiles[Math.floor(Math.random() * tilesCount)];

    // console.log($randomTile1.id, $randomTile2.id);

    // Animate 2 random tiles
    TweenMax.to($randomTile1, 0.66, {
      rotation: -5 + Math.random() * -5,
      x: Math.random() * -10,
      y: Math.random() * 10,
    });
    TweenMax.to($randomTile2, 0.66, {
      rotation: 5 + Math.random() * 5,
      x: Math.random() * 10,
      y: Math.random() * -10,
    });

    // Build timeline
    tl.to([$NespressoCup_01_Left, $rightCup, $BiscuitsOnPlate_01], 1, {y: -duration});
    tl.to($logoApp, 1, {y: -200, opacity: 0}, '-=0.78');
    tl.to($text, 1, {y: -200, opacity: 0}, '-=0.79');

    $tiles.each(function(i, tile) {
      var obj;

      if (tile.id === 'tile-BC') {
        obj = {
          x: 0,
          y: 0,
          zIndex: 50,
          scale: 1.3,
          ease: Back.easeOut,
        };
        // tile.style.zIndex = 50;
      } else {
        obj = {
          x: -(App.width / 2) + Math.random() * App.width,
          y: -(App.height / 2) + Math.random() * App.height,
          ease: Back.easeOut,
        };
      }
      tl.to(tile, 1, obj, '-=0.96');

    }.bind(this));



    // Create scene
    var scene = new ScrollMagic.Scene({
      triggerElement: options.$el[0],
      duration: App.height * 3,
      // duration: ,
      offset: 0,
      triggerHook: 0,
    })
      .addIndicators()
      .setPin(options.$el[0], {
        // pushFollowers: false,
      })
      .setTween(tl)
      .addTo(options.controller);

    return scene;

  };


});