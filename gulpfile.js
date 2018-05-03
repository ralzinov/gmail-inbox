const gulp = require('gulp');

function defaultTask(done) {
    // place code for your default task here
    console.log(1);
    done();
}

gulp.task('default', defaultTask);
