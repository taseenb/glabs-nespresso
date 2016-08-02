define(function (require) {

  'use strict';

  return [
    {
      id: 'intro',
      type: 'intro',
      year: 'BC',
      introCopy: 'Nespresso has been bringing barista-quality coffee into homes for the last 30 years, but its expertise is also built on centuries of experimentation.',
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '0',
      type: 'chapter',
      chapter: true,
      year: 1000,
      contentTpl: require('hbs!../tpl/scenes/chapters/0'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '1',
      type: 'chapter',
      chapter: true,
      year: 1450,
      contentTpl: require('hbs!../tpl/scenes/chapters/1'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '2',
      type: 'chapter',
      chapter: true,
      year: 1511,
      contentTpl: require('hbs!../tpl/scenes/chapters/2'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '3',
      type: 'chapter',
      chapter: true,
      year: 1600,
      contentTpl: require('hbs!../tpl/scenes/chapters/3'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '4',
      type: 'chapter',
      chapter: true,
      year: 1632,
      contentTpl: require('hbs!../tpl/scenes/chapters/4'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '5',
      type: 'chapter',
      chapter: true,
      year: 1652,
      contentTpl: require('hbs!../tpl/scenes/chapters/5'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '6',
      type: 'chapter',
      chapter: true,
      year: 1674,
      contentTpl: require('hbs!../tpl/scenes/chapters/6'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '7',
      type: 'chapter',
      chapter: true,
      year: 1732,
      contentTpl: require('hbs!../tpl/scenes/chapters/7'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '8',
      type: 'chapter',
      year: 1757,
      contentTpl: require('hbs!../tpl/scenes/chapters/8'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '9',
      type: 'chapter',
      chapter: true,
      year: 1773,
      contentTpl: require('hbs!../tpl/scenes/chapters/9'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '10',
      type: 'chapter',
      chapter: true,
      year: 1822,
      contentTpl: require('hbs!../tpl/scenes/chapters/10'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '11',
      type: 'chapter',
      chapter: true,
      year: 1938,
      contentTpl: require('hbs!../tpl/scenes/chapters/11'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: '12',
      type: 'chapter',
      chapter: true,
      year: 1986,
      contentTpl: require('hbs!../tpl/scenes/chapters/12'),
      title: 'Title here',
      copy: 'Copy here',
    },
    {
      id: 'end',
      type: 'end',
    },
  ];

});