var config = require("./anuconfig");

var buildFolder = config.globalConfig.buildFolder;
var workFolder = config.globalConfig.workFolder;
var destFolder = config.globalConfig.destFolder;

var gulp = require('gulp-param')(require('gulp'), process.argv);
var rootpath = process.cwd();


var path = require("path");
var sass = require('gulp-ruby-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var stream = {};
gulp.task("build-scss", function () {
  stream = sass(path.join(workFolder, config.sassConfig.srcpath), {
    require: ["sass-json-vars", "sass-globbing", "sass/zhilizhili"],
    sourcemap: true,
    verbose: true
  }).on('error', sass.logError);

  stream = stream.pipe(postcss([
    autoprefixer({ browsers: ['> 1%',  'ios >= 7'] })
  ])).pipe(rename(function (path) {
      path.basename = path.basename + "";
  }));

  stream.pipe(gulp.dest(path.join(workFolder, config.sassConfig.destfolder)))
});

gulp.task("watch-scss", function () {
  gulp.watch(path.join("./src/assets", config.sassConfig.srcpath), ['build-scss']);
});

let scssSrcPath = path.join(workFolder, config.sassConfig.srcpath);
let watchPath = path.join(workFolder, config.sassConfig.watchpath);
let destPath = path.join(workFolder, config.sassConfig.destfolder);

var sassport = require("gulp-sassport");

gulp.task('sass', function() {
  return gulp.src(scssSrcPath)
    .pipe(sassport([
      require("./sassmodule/foo")
    ], {
    }))
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%',  'ios >= 7'] })
    ]))
    .pipe(gulp.dest(destPath));
});

gulp.task('sass:watch', function() {
  gulp.watch(watchPath, ['sass']);
});

let domesome = require("/Users/tongguwei/frontprojects/sassporttest/domesome");

gulp.task('pre', function() {
  domesome("./src/assets/sass/style.yml");
});

