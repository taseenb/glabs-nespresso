var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var del = require('del');
var fs = require('fs');
var settings = require('./settings.js');
var livereload = require('gulp-livereload');

var options = {
  "env": "build"
};

gulp.task('connect', function () {
  $.connect.server({
    root: 'build',
    port: '5000',
    host: '0.0.0.0',
    livereload: false
  });
});

gulp.task('clean-build', del.bind(null, ['build']));
gulp.task('clean-dist', del.bind(null, ['dist']));

gulp.task('sass', function () {
  gulp.src('./src/styles/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie >= 9']}))
    .pipe($.replace("url(\"//", "url(\"http://"))
    .pipe($.replace("url(../", "url(" + settings.root[options.env]))
    .pipe($.minifyCss())
    .pipe(gulp.dest('./' + options.env + '/styles'))
    .pipe(livereload());
});

gulp.task('images', function () {
  return gulp.src('./src/images/**')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./' + options.env + '/images'));
});

gulp.task('json', function () {
  gulp.src('./src/json/*.json')
    .pipe(gulp.dest('./' + options.env + '/json'))
    .pipe(livereload());
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./' + options.env));
});

gulp.task('bootjs', function () {
  gulp.src('./src/boot.js')
    .pipe($.replace("{{rootPath}}", settings.root[options.env]))
    .pipe(gulp.dest('./' + options.env))

});

gulp.task('requirejs', function () {
  if (options.env === 'build') {
    gulp.start(['requirejs-build'])
  } else {
    gulp.start(['requirejs-dist']);
  }
});

gulp.task('requirejs-build', $.shell.task(['r.js -o rjs-config-build.js']));
gulp.task('requirejs-dist', $.shell.task(['r.js -o rjs-config-dist.js']));

gulp.task('scripts', ['requirejs'], function () {
  gulp.src('./src/vendor/requirejs/require.js')
    .pipe(gulp.dest('./' + options.env + '/vendor/requirejs'))
    .pipe(livereload());
});

gulp.task('build', ['clean-build'], function () {
  console.log('Clean up complete. Build ' + options.env);
  gulp.start(['html', 'images', 'json', 'bootjs', 'sass', 'scripts']);
});

gulp.task('dist', ['clean-dist'], function () {
  options.env = "dist";
  console.log('Clean up complete. Build ' + options.env);
  gulp.start(['html', 'images', 'json', 'bootjs', 'sass', 'scripts']);
});

gulp.task('watch', function () {
  gulp.watch(['./src/styles/**/*.scss'], ['sass']);
  gulp.watch(['./src/scripts/**'], ['scripts']);
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/boot.js'], ['bootjs']);
  gulp.watch(['./src/images/*'], ['images']);
  livereload.listen();
});

gulp.task('default', ['build', 'connect', 'watch']);
