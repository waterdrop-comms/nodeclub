var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var htmlmin = require('gulp-htmlmin');
var angularTemplateCache = require('gulp-angular-templatecache');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var addStream = require('add-stream');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(['./controllers/**/*.js', './gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



gulp.task('watch', function () {
//  gulp.watch(['./client/**/*.js', './server/**/*.js', './gulpfile.js'], ['lint']);
  gulp.watch(['./controllers/**/*.js'], []);
//  gulp.watch('./client/app/*.html', ['html']);
});

gulp.task('nodemon', function () {
  return nodemon({
    script: './app.js',
    //ext: 'js',
    ignore: [
      'node_modules/'
    ],
    env: {'NODE_ENV': 'development'}
  });
});


//gulp.task('build', ['lint', 'assets', 'sass', 'html', 'app']);
//gulp.task('run', ['watch', 'nodemon']);
//gulp.task('default', ['build', 'run']);

gulp.task('build', ['lint']);
gulp.task('run', ['watch', 'nodemon']);
gulp.task('default', ['build', 'run']);
