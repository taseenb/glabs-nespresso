require.config({
  paths: {
    'main': './main',
    'global': './global',

    'jquery': '../../node_modules/jquery/dist/jquery',
    "swiper": '../../node_modules/swiper/dist/js/swiper.jquery',
    "underscore": "../../node_modules/underscore/underscore",
    "mediator-js": "../../node_modules/mediator-js/lib/mediator",
    "TweenMax": "../../node_modules/gsap/src/uncompressed/TweenMax",
    "TimelineMax": "../../node_modules/gsap/src/uncompressed/TimelineMax",
    "TweenLite": "../../node_modules/gsap/src/uncompressed/TweenLite",
    "TimelineLite": "../../node_modules/gsap/src/uncompressed/TimelineLite",
    "ScrollToPlugin": "../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin",
    "ScrollMagic": "../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic",
    "ScrollMagicAnimation": '../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
    "ScrollMagicIndicators": '../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators',
    "blast-text": "../../node_modules/blast-text/jquery.blast",
    "imagesloaded": "../../node_modules/imagesloaded/imagesloaded.pkgd",

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