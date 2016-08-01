/**
 * r.js config
 * See all the options and more at:
 * https://github.com/jrburke/r.js/blob/master/build/example.build.js
 */

({
	baseUrl: 'src/scripts',
	mainConfigFile: 'src/scripts/configPaths.js',
	optimize: "uglify2",
	inlineText: true,
	name: '../vendor/almond/almond',
	out: 'build/scripts/main.js',
	generateSourceMaps: true,
	preserveLicenseComments: false,
	include: ['main'],
	wrap: {
		start: 'define(["require"],function(require){var req=(function(){',
		end: 'return require; }()); return req; });'
	}
})
