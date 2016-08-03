define(function (require) {

  var ScrollMagic = require('ScrollMagic');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');

  // Elements
  var $NespressoCup_01_Left;
  var $rightCup;
  var $BiscuitsOnPlate_01;
  var $tilesWrapper;
  var $tiles;
  var $introTile;
  var $body;
  var $text;
  var $logoApp;
  var $text1, $text2;
  var $randomTile1, $randomTile2;
  var tilesCount;

  function setupElements($el) {
    $NespressoCup_01_Left = $el.find('.NespressoCup_01_Left');
    $rightCup = $el.find('.right-cup');
    $BiscuitsOnPlate_01 = $el.find('.BiscuitsOnPlate_01');
    $tilesWrapper = $el.find('.images-wrapper');
    $tiles = $tilesWrapper.find('.tile');
    $introTile = $tiles.filter('#tile-BC');
    $body = $el.find('.body');
    $text = $body.find('.text');
    $logoApp = $body.find('.logo-app');
    $text1 = $text.find('.inner-1');
    $text2 = $text.find('.inner-2');

    tilesCount = $tiles.length;
    $randomTile1 = $tiles.not($introTile)[Math.floor(Math.random() * tilesCount)];
    $randomTile2 = $tiles.not($introTile)[Math.floor(Math.random() * tilesCount)];
  }

  return function (options) {
    setupElements(options.$el);

    var tl = new TimelineMax();
    var duration = App.height * 5;
    var tileSize = $tiles.eq(0).width(); //

    // Build timeline
    tl.to([$NespressoCup_01_Left, $rightCup, $BiscuitsOnPlate_01], 1, {y: -App.height});
    tl.to($text1, 1, {y: -20, opacity: 0}, '-=0.8');
    tl.to($text2, 1, {y: 0, opacity: 1}, '-=0.3');
    tl.to($text2, 1, {y: -20, opacity: 0}, '+=0.5');
    tl.to($logoApp, 1, {y: -100, opacity: 0}, '-=0.5');
    tl.to($tilesWrapper, 1, {x: '0%', y: '0%'}, '-=0.5');

    $tiles.each(function (i, tile) {
      var obj;

      if (tile.id === 'tile-BC') {
        obj = {
          x: 0,
          y: 0,
          zIndex: 50,
          ease: Back.easeOut,
        };
      } else {
        var screenW = App.width - tileSize * 1.5;
        var screenH = App.height - tileSize * 1.5;
        obj = {
          x: -(screenW / 2) + Math.random() * screenW,
          y: -(screenH / 2) + Math.random() * screenH,
          ease: Back.easeOut,
        };
      }
      tl.to(tile, 1, obj, '-=0.96');
    }.bind(this));

    tl.staggerTo($tiles.not($introTile), 1, {y: App.height}, -0.3);

    tl.set($tiles.not($introTile), {display: 'none'});

    tl.to($introTile, 1, {
      scale: 1.3,
      x: '-100%',
      rotation: '-7',
      ease: Back.easeOut,
    }, '-=1.5');

    // Create scene
    var scene = new ScrollMagic.Scene({
      triggerElement: options.$el[0],
      duration: duration,
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


    // Position the tiles at the beginning
    // and rotate/translate a couple of tiles
    setTimeout(function () {
      TweenMax.set($tilesWrapper, {x: '-32%', y: '-20%'});

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
    }, 0);

    return scene;

  };


});