/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

/*
* Configuración de la tarea 'demo'
*/
gulp.task('demo', function () {


  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
  .pipe(concat('ababool.css'))
  .pipe(uglify())
  .pipe(gulp.dest('public/stylesheets/'))




  gulp.src('public/javascripts/source/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/build/'))
});
