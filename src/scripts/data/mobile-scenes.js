define(function (require) {

  var originalData = require('./scenes');
  var _ = require('underscore');

  'use strict';

  var mobileData = [
    {
      intro: true,
      mobileImg: '_0000_01.jpg',
    },
    {
      mobileImg: '_0001_02.jpg',
    },
    {
      mobileImg: '_0002_03.jpg',
    },
    {
      mobileImg: '_0003_04.jpg',
    },
    {
      mobileImg: '_0004_05.jpg',
    },
    {
      mobileImg: '_0005_06.jpg',
    },
    {
      mobileImg: '_0006_07.jpg',
    },
    {
      mobileImg: '_0007_08.jpg',
    },
    {
      mobileImg: '_0008_09.jpg',
    },
    {
      mobileImg: '_0009_10.jpg',
    },
    {
      mobileImg: '_0010_11.jpg',
    },
    {
      mobileImg: '_0011_12.jpg',
    },
    {
      mobileImg: '_0012_13.jpg',
    },
    {
      mobileImg: '_0013_14.jpg',
    },
    {
      mobileImg: '_0014_15.jpg',
    },
  ];

  mobileData.forEach(function(data, i) {
    var idx = i - 1;
    if (idx < 0) {
      idx = 0;
    }
    mobileData[i] = _.extend(data, originalData[idx]);
  });

  console.log(mobileData);

  return mobileData;

});