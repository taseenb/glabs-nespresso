define(function (require) {

  var ScrollMagic = require('ScrollMagic');
  var App = require('global');
  var TimelineMax = require('TimelineMax');
  var TweenMax = require('TweenMax');


  // Elements
  var $NespressoCup_01_Left;
  var $rightCup;
  var $BiscuitsOnPlate_01;

  function setupElements($el) {
    $NespressoCup_01_Left = $el.find('.NespressoCup_01_Left');
    $rightCup = $el.find('.right-cup');
    $BiscuitsOnPlate_01 = $el.find('.BiscuitsOnPlate_01');
  }

  return function (options) {
    var tl = new TimelineMax();
    var duration = App.height * 3;
    setupElements(options.$el);

    // Build timeline
    tl.to([$NespressoCup_01_Left, $rightCup, $BiscuitsOnPlate_01], 1, {y: -duration});


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