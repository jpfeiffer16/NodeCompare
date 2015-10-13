var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    config = require('./config/config.js'),
    less = require('gulp-less');
//Task to build our css file from less
gulp.task('build-less', function(){
  return gulp.src(config.root + '/app/styles/style.less')
      .pipe(less())
      .pipe(gulp.dest('./public/css/'));
});