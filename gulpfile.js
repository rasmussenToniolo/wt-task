const { task, src, dest, series, watch } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("node-sass"));
const concat = require("gulp-concat");
const cssNano = require("gulp-cssnano");
const image = require("gulp-image");

task("copyHtml", () => {
  return src("src/*.html").pipe(dest("dist"));
});

task("scripts", () => {
  return src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"));
});

task("sass", () => {
  return src("src/sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssNano())
    .pipe(dest("dist/css"));
});

task("imgMin", () => {
  return src("src/img/*").pipe(image()).pipe(dest("dist/img"));
});

task("default", series("copyHtml", "scripts", "sass", "imgMin"));

task("watch", () => {
  watch("src/js/*.js", series("scripts"));
  watch("src/sass/*.scss", series("sass"));
  watch("src/*.html", series("copyHtml"));
});
