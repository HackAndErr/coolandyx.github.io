const gulp = require('gulp'); 
const sass = require('gulp-sass')(require('sass'));     
const clean = require('gulp-clean'); 
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const { series } = require('gulp');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');


gulp.task('cleanDist', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('scssToCss', function(){    
	return gulp.src('src/scss/style.scss')                                                                                         
	.pipe(sass())                                                                                                       
	.pipe(gulp.dest( 'dist' ) )                                               
});    

gulp.task('concatinationCss', function() {
    return gulp.src('dist/style.css')
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('concatinationJs', function() {
    return gulp.src('src/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minifyCss', function(){
    return gulp.src('dist/styles.min.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
  });

gulp.task('minifyJs', async function() {
    return pipeline(
        gulp.src('dist/scripts.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
    )
  })

 gulp.task('imgMin', async function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('cleanCss', function(){
    return gulp.src('dist/style.css', {read: false})
        .pipe(clean());
});

gulp.task('browserSync', function() {
    browserSync.init({
        watch: true,
        server: {
            baseDir: "./"
        }
    });
  });

  gulp.task('stream', function () {
    gulp.watch(['src/scss/*.scss'], gulp.series('scssToCss', 'concatinationCss', 'minifyCss', 'cleanCss'));
    gulp.watch(['src/js/*.js'], gulp.series('concatinationJs', 'minifyJs'));       
});

gulp.task('build', gulp.series('cleanDist', 'scssToCss', 'concatinationCss', 'concatinationJs', 'minifyCss', 'minifyJs', 'imgMin', 'cleanCss'));
gulp.task('dev', gulp.parallel('stream', 'browserSync'));