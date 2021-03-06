var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('gulp-rucksack')
var cssnext = require('postcss-cssnext')
// var autoprefixer = require('autoprefixer');
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var lost = require('lost')
var atImport = require('postcss-import')
var csswring = require('csswring')
var browserSync = require('browser-sync').create()



// Servidor de desarrollo

gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir:'./dist'
    }
  })
})

//Tarea para procesar el CSS (deben tener un orden los pluggins)

gulp.task('css', function(){

  var processors =[
    atImport(),
    mixins(),
    cssnested, // primero que cssnext
    // autoprefixer({ browsers: ['>5%', 'ie 8']}),
    lost(),
    rucksack(),
    cssnext({browsers: ['>5%', 'ie 8']}), // ya contiene autoprefixer por eso o borraré
    csswring()
  ]

  return gulp.src('./src/invie.css')
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
