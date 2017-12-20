const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

//logs message
gulp.task('message', () => {
  return console.log('Gulp is running');
});


//COPY ALL HTML FILES
gulp.task('copyHTML', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

//Optimize images
gulp.task('imageMin', () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});


//Minimizes javascript
gulp.task('minify', () => {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Compile Sass
gulp.task('sass', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

//Scripts
gulp.task('scripts', () => {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Watches below file types for changes and runs corresponding task
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHTML']);
});

//Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//Browser-sync reload
gulp.task('bs-reload', function() {
  browserSync.reload();
});

//logs message without needing to specify which task
gulp.task('default', ['message', 'copyHTML', 'imageMin', 'sass', 'scripts']);
