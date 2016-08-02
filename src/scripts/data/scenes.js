define(function (require) {

  'use strict';

  return [
    {
      id: 'intro',
      type: 'intro',
    },
    {
      id: '0',
      type: 'chapter',
      chapter: true,
      year: 1000,
      contentTpl: require('hbs!../tpl/scenes/chapters/0'),
    },
    {
      id: '1',
      type: 'chapter',
      chapter: true,
      year: 1450,
      contentTpl: require('hbs!../tpl/scenes/chapters/1'),
    },
    {
      id: '2',
      type: 'chapter',
      chapter: true,
      year: 1511,
      contentTpl: require('hbs!../tpl/scenes/chapters/2'),
    },
    {
      id: '3',
      type: 'chapter',
      chapter: true,
      year: 1600,
      contentTpl: require('hbs!../tpl/scenes/chapters/3'),
    },
    {
      id: '4',
      type: 'chapter',
      chapter: true,
      year: 1632,
      contentTpl: require('hbs!../tpl/scenes/chapters/4'),
    },
    {
      id: '5',
      type: 'chapter',
      chapter: true,
      year: 1652,
      contentTpl: require('hbs!../tpl/scenes/chapters/5'),
    },
    {
      id: '6',
      type: 'chapter',
      chapter: true,
      year: 1674,
      contentTpl: require('hbs!../tpl/scenes/chapters/6'),
    },
    {
      id: '7',
      type: 'chapter',
      chapter: true,
      year: 1732,
      contentTpl: require('hbs!../tpl/scenes/chapters/7'),
    },
    {
      id: '8',
      type: 'chapter',
      year: 1757,
      contentTpl: require('hbs!../tpl/scenes/chapters/8'),
    },
    {
      id: '9',
      type: 'chapter',
      chapter: true,
      year: 1773,
      contentTpl: require('hbs!../tpl/scenes/chapters/9'),
    },
    {
      id: '10',
      type: 'chapter',
      chapter: true,
      year: 1822,
      contentTpl: require('hbs!../tpl/scenes/chapters/10'),
    },
    {
      id: '11',
      type: 'chapter',
      chapter: true,
      year: 1938,
      contentTpl: require('hbs!../tpl/scenes/chapters/11'),
    },
    {
      id: '12',
      type: 'chapter',
      chapter: true,
      year: 1986,
      contentTpl: require('hbs!../tpl/scenes/chapters/12'),
    },
    {
      id: 'end',
      type: 'end',
    },
  ];

});