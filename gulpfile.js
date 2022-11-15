const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

function styles() {
  return gulp
    .src("assets/source/styles/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest("assets/dist/styles"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("assets/source/scripts/**/*.js")
    .pipe(concat("app.js"))
    .pipe(gulp.dest("assets/dist/scripts"));
}

function images() {
  return gulp
    .src("assets/source/images/**/*.{png,jpg,jpeg,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("assets/dist/images"));
}

function fonts() {
  return gulp
    .src("assets/source/fonts/*/**")
    .pipe(gulp.dest("./assets/dist/fonts"));
}

function html() {
  return gulp.src("*.html").pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: "./",
  });

  gulp.watch("*.html", html);
  gulp.watch("assets/source/styles/**/*.scss", styles);
  gulp.watch("assets/source/scripts/**/*.js", scripts);
  gulp.watch("assets/source/images/**/*.{png,jpg,jpeg,svg}", images);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.watch = watch;

gulp.task("default", gulp.parallel(styles, scripts, images, fonts));
