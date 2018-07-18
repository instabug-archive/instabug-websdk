/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import size from 'gulp-size';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import del from 'del';
import jsdoc from 'gulp-jsdoc3';
import { Server } from 'karma';
import webpackConfig from './webpack.config.babel';

const reload = browserSync.reload;
const paths = {
  jsSrc: 'src/**/*.js',
  sassSrc: 'src/styles/*.scss',
  sdkStyle: 'src/styles/ibgSdk.scss',
  destDir: 'new-dist',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  buildFolder: 'build',
  sdkMain: 'src/index.js',
  allTests: 'test/**/*Specs.js',
  karmaConfig: 'karma.config.babel.js',
};

gulp.task('test', (done) => {
  new Server({
    configFile: `${__dirname}/${paths.karmaConfig}`,
  }, done).start();
});

gulp.task('lint', () => gulp.src([
  paths.jsSrc,
  paths.gulpFile,
  paths.webpackFile,
  paths.karmaConfig,
  paths.allTests,
])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('clean', () => {
  del('build/*');
});

gulp.task('styles', () => {
  gulp.src(paths.sdkStyle)
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('src/views'))
    .pipe(reload({ stream: true }));
});

gulp.task('main', ['lint', 'styles'], () => {
  gulp.src(paths.sdkMain)
    .pipe(babel())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.buildFolder))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
  gulp.watch(paths.jsSrc, ['main']);
  gulp.watch(paths.sassSrc, ['main']);
  gulp.watch('src/views/*.html', ['main']);
  gulp.watch([paths.webpackFile, paths.karmaConfig], ['main']);
  gulp.watch([paths.allTests], ['main']);
});

gulp.task('sync', () => {
  browserSync({
    startPath: './example',
    server: {
      baseDir: './',
    },
  });
});

gulp.task('docs', (cb) => {
  // const config = require('./jsdoc.json');
  gulp.src(['README.md', './src/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});

gulp.task('dist', ['clean', 'main', 'test'], () => {
  const s = size({
    gzip: true,
    showFiles: true,
  });
  gulp.src(`${paths.buildFolder}/instabug-sdk.js`)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(s)
    .pipe(gulp.dest(paths.buildFolder))
    .pipe(notify({
      onLast: true,
      title: 'Instabug SDK Build Done',
      message: () => `Total size ${s.prettySize}`,
    }))
    .on('error', () => {
      process.exit(1);
    });
});

gulp.task('default', ['sync', 'watch', 'main']);
