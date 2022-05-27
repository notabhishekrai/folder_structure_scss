const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

// Compile scss into css
function style() {
    // locate scss files
    return (
        gulp
            .src("./src/scss/**/*.scss")
            .pipe(sourcemaps.init())
            //pass through sass compiler
            .pipe(
                sass({ outputStyle: "compressed" }).on("error", sass.logError)
            )
            .pipe(autoprefixer())
            .pipe(sourcemaps.write("./maps"))
            //output css file
            .pipe(gulp.dest("./css"))

            //browsersync
            .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        proxy: "http://127.0.0.1:5500/_html/index.html",
    });
    gulp.watch("./src/scss/**/*.scss", style);
    gulp.watch("./**/*.html").on("change", browserSync.reload);
    gulp.watch("./**/*.php").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.watch = watch;
