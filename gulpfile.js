"use strict";
const gulp = require("gulp");
const scss = require("gulp-sass");
const debug = require("gulp-debug");
const sourceMap = require("gulp-sourcemaps");
const autoPrefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const spritesmith = require("gulp.spritesmith");

gulp.task("scss", function() {
  return gulp
    .src("develop/scss/main.scss")
    .pipe(sourceMap.init())
    .pipe(scss())
    .pipe(
      autoPrefixer({
        browsers: ["last 10 versions"],
        cascade: 1
      })
    )
    .pipe(gulp.dest("public/css"))
    .pipe(sourceMap.write());
});
gulp.task("sprite", function() {
  var spriteData = gulp.src("develop/img/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.scss"
    })
  );
  return spriteData.pipe(gulp.dest("develop/scss/sprites"));
});
gulp.task("clean", function() {
  return del("public");
});
gulp.task("public", function() {
  return gulp
    .src("develop/**/*.*", { since: gulp.lastRun("public") })

    .pipe(gulp.dest("public"));
});
gulp.task("server", function() {
  browserSync.init({
    server: "public"
  });
  browserSync.watch("public/**/*.*").on("change", browserSync.reload);
});
gulp.task("build", gulp.series("clean", gulp.parallel("scss", "public")));
gulp.task("watch", function() {
  gulp.watch("develop/scss/**/*.*", gulp.series("scss"));
  gulp.watch("develop/**/*.*", gulp.series("public"));
});
gulp.task("dev", gulp.series("build", gulp.parallel("watch", "server")));
