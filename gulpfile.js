const gulp = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

gulp.task('move-scss', ["clean"], () => {
    gulp.src('components/wy-image-viewer/wy-image-viewer.scss')
        .pipe(gulp.dest("bin/components/wy-image-viewer"));
    gulp.src("components/wy-slides/wy-slides.scss")
        .pipe(gulp.dest("bin/components/wy-slides"));
});

gulp.task('build', ["move-scss"], () => {
    console.log('build');
    return shell.task('nodule_modules/.bin/tsc')
});
gulp.task('clean', [], (cb) => {
    return del([
        "./bin"
    ], cb)
});
gulp.task('default', ["move-scss"]);