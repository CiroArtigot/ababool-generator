/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

/*
* Configuración de la tarea 'demo'
*/

gulp.task('concatenar', function() {
    gulp.src([
    './bower_components/angular/angular.min.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './public/javascripts/ababool.js'])
        .pipe(concat('ababool.min.js'))
        .pipe(gulp.dest('./public/javascripts/'));

    gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './public/stylesheets/system.css',
    './public/stylesheets/transitions.css',
    './public/stylesheets/theme.css'])
        .pipe(concat('ababool.css'))
        .pipe(gulp.dest('./public/stylesheets/'));

});
