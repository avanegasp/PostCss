var gulp = require('gulp');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();


// Servidor de desarrollo

gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir:'./dist'
    }
  })
})

//Tarea para procesar el CSS

gulp.task('css', function(){

  var processors =[]

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css')) // donde deja todo el css
    .pipe(browserSync.stream()) // recargar la página sin hacer f5
})

//(VIGILANCIA) tarea para vigilar los cambios

gulp.task('watch', function(){
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default',['watch', 'serve'])
