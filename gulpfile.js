const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

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
gulp.task('imagemin', () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});


//Minimizes javascript
gulp.task('minifyJS', () => {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Converts ES6 to ES5
gulp.task('es6', () => {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: 'babel-preset-env'
    }))
    .pipe(gulp.dest('dist/js'));
})

//Compile Sass
gulp.task('css', () => {
  gulp.src('src/utilities/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Scripts
gulp.task('scripts', () => {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

//Watches below file types for changes and runs corresponding task
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['scripts', 'es6', 'bs-reload']);
  gulp.watch('src/images/*', ['imagemin', 'bs-reload']);
  gulp.watch('src/utilities/*.scss', ['css', 'bs-reload']);
  gulp.watch('src/*.html', ['bs-reload']);
});

//Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

//Browser-sync reload
gulp.task('bs-reload', function() {
  browserSync.reload();
});

//Tasks that run when using only the command gulp
gulp.task('default', ['message', 'copyHTML', 'css', 'scripts', 'imagemin', 'es6', 'browser-sync', 'watch']);
