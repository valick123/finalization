"use strict";
const gulp = require("gulp");
const scss = require("gulp-sass");
const debug = require("gulp-debug");
const sourceMap = require("gulp-sourcemaps");
const autoPrefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const spritesmith = require("gulp.spritesmith");
const babel = require("gulp-babel");

gulp.task("scss", function() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sourceMap.init())
    .pipe(scss())
    .pipe(
      autoPrefixer({
        browsers: ["last 10 versions"],
        cascade: 1
      })
    )
    .pipe(gulp.dest("./.tmp/css"))
    .pipe(sourceMap.write());
});
gulp.task("js", function() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest("./.tmp/js"));
});
gulp.task("sprite", function() {
  let spriteData = gulp.src("src/img/*.*").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.scss",
      cssFormat: "scss"
    })
  );

  return (
    spriteData.img.pipe(gulp.dest("./.tmp/img/sprite")),
    spriteData.css.pipe(gulp.dest("src/scss/config"))
  );
});
gulp.task("clean", function() {
  return del("./.tmp");
});
gulp.task("copy", function() {
  return gulp
    .src("./src/**/*.*", { since: gulp.lastRun("copy") })
    .pipe(gulp.dest("./.tmp"));
});
gulp.task("public", function() {
  return gulp
    .src("./.tmp/**/*.*", { since: gulp.lastRun("public") })

    .pipe(gulp.dest("app"));
});
gulp.task("server", function() {
  browserSync.init({
    server: "./.tmp"
  });
  browserSync.watch("./.tmp/**/*.*").on("change", browserSync.reload);
});

gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.*", gulp.series("scss"));
  gulp.watch("src/**/*.*", gulp.series("copy"));
  gulp.watch("src/js/*.js", gulp.series("js"));
  gulp.watch("src/img/*.*", gulp.series("sprite"));
});
gulp.task(
  "dev",
  gulp.series(
    gulp.parallel("clean"),
    gulp.parallel("scss", "copy", "sprite", "js"),
    gulp.parallel("watch", "server")
  )
);
gulp.task(
  "build",
  gulp.series(
    gulp.parallel("clean"),
    gulp.parallel("scss", "copy", "sprite", "js"),
    gulp.parallel("public")
  )
);
