const gulp = require('gulp');
const path = require('path');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const log = require('fancy-log');
const del = require('del');

const webpackConfig = require("./webpack.config.js");
const OUT_PATH = path.join(__dirname, '/build');
const STATIC_FILES = [
    'static/**/*'
];

function listenForExit(callback) {
    process.on('SIGINT', function () {
        setTimeout(function () {
            log('Successfully closed process:' + process.pid);
            callback();
            process.exit(1);
        }, 500);
    });
}

gulp.task('set-dev-env', () => {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-env', () => {
    return process.env.NODE_ENV = 'production';
});

gulp.task('clean-out-dir', function () {
    return del([`${OUT_PATH}/**/*`]);
});

gulp.task('copy-static', () => {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest(OUT_PATH));
});

gulp.task('build', (done) => {
    process.env.NODE_ENV = 'production';
    webpack(webpackConfig, () => done());
});

gulp.task('dev', (done) => {
    listenForExit(done);
    process.env.NODE_ENV = 'development';
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, {
        hot: true,
        contentBase: path.join(__dirname, "./build"),
        headers: {"Access-Control-Allow-Origin": "*"}
    });

    return server.listen(3000);
});

gulp.task('release', () => {
    // increment version in manifest, at package.json, build bundle, create zip)
});

gulp.task('default', gulp.series('clean-out-dir', 'copy-static', 'dev'));
