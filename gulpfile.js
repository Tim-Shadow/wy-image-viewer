const gulp = require("gulp");
gulp.task('default', () => {
    gulp.src('components/wy-image-viewer/wy-image-viewer.scss')
        .pipe(gulp.dest("bin/components/wy-image-viewer"));
    gulp.src("components/wy-slides/wy-slides.scss")
        .pipe(gulp.dest("bin/components/wy-slides"));
});