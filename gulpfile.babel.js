/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import ghPages from 'gulp-gh-pages';
import del from 'del';
import path from 'path';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js',
  allSrcCss: 'src/**/*.?(s)css',
  clientEntryPoint: 'src/app.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  distDir: 'dist/',
};

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del([
  paths.distDir
]));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch([paths.allSrcJs, paths.allSrcCss], ['build']);
});

gulp.task('deploy', ['build'], () => {
  gulp.src(path.join(paths.distDir, '/**/*'))
    .pipe(ghPages());
});

gulp.task('default', ['watch', 'build']);