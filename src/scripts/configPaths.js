require.config({
  paths: {
    'main': './main',
    'global': './global',

    'jquery': '../../node_modules/jquery/dist/jquery',
    "underscore": "../../node_modules/underscore/underscore",
    "mediator-js": "../../node_modules/mediator-js/lib/mediator",
    "scrollmagic": "../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic",
    "blast-text": "../../node_modules/blast-text/jquery.blast",
    "imagesloaded": "../../node_modules/imagesloaded/imagesloaded.pkgd",
    "TweenMax": "../../node_modules/gsap/src/uncompressed/TweenMax",

    'hbs': '../vendor/require-handlebars-plugin/hbs',
    'handlebars': "../vendor/require-handlebars-plugin/hbs/handlebars.runtime",
  },
  hbs: { // optional
    'helpers': true,            // default: true
    'templateExtension': 'hbs', // default: 'hbs'
    'partialsUrl': '',           // default: ''
    'handlebarsPath': 'handlebars'
  },
  stubModules: ['hbs', 'hbs/underscore', 'hbs/json2', 'hbs/handlebars'],
});