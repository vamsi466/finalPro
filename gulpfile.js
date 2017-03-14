// Gulp plugins
var gulp = require('gulp');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var gulpNgConfig = require('gulp-ng-config');
var webserver = require('gulp-webserver');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// Misc
var spawn = require('child_process').spawn;
var argv = require('minimist')(process.argv.slice(2));
var rimraf = require('rimraf');

// Webpack
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// Karma
var karma = require('karma');
var karmaServer = karma.server;

// Ports
var ports = {
  livereload: 35730,
  dev: 5000
};

// Paths
var paths = {
  other: [
    '!src/index.html',
    'src/images/**',
    'src/fonts/**',
    '!src/**/*.js',
    '!src/**/*.sass',
    '!src/**/*.tpl.html'
  ],
  distDir: './dist/'
};


//Webpack config
if (argv.production) { // --production option
  webpackConfig.plugins = webpackConfig
                                .plugins
                                .concat(
                                  new ngAnnotatePlugin(),
                                  new webpack.optimize.UglifyJsPlugin()
                                );

  webpackConfig.devtool = false;
}


var prodConfig = Object.create(webpackConfig);
prodConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
      'process-env': {
          'NODE_ENV': JSON.stringify('production')
      }
  }),
  new ngAnnotatePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

gulp.task('webpack:build', function (done) {
  webpack(prodConfig, function (err, stats) {
    if (err) {
        throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    done();
  });
});

var webpackDevConfig = Object.create(webpackConfig);
webpackDevConfig.devtool = 'eval';
webpackDevCompiler = webpack(webpackDevConfig);

gulp.task('webpack-dev-server', function (cb) {
  new WebpackDevServer(webpackDevCompiler, {
    contentBase: paths.distDir,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      colors: true
    }
  }).listen(ports.dev, '0.0.0.0', function (err) {

    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:' + ports.dev);

  });

});

// gulp other, moves changed files from source to other
gulp.task('other', function () {
  gulp.src(paths.other)
    .pipe(changed(paths.distDir))
    .pipe(gulp.dest(paths.distDir));
});

// gulp test:unit, runs unit test suite
gulp.task('test:unit', function () {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  });
});

// gulp test, runs full test suite
gulp.task('test', ['test:unit']);

// clears dist directory
gulp.task('clearTarget', function () {
  rimraf(paths.distDir, gutil.log);
});

// gulp build, runs build
gulp.task('build', [
  'clearTarget',
  'webpack:build',
  'other'
]);

// gulp watch, watch for changes
gulp.task('watch', ['clearTarget', 'other'], function () {
  webpack(webpackDevConfig)
    .watch(200, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({
        colors: true
      }));
    });

  gulp.watch(paths.other, ['other']);
});

// gulp serve, launches webpack-dev-server and watches
gulp.task('serve', ['webpack-dev-server','watch']);

// gulp serve:production builds and implements for build file 
gulp.task('serve:production', ['build'], function(){
  gulp.src(paths.distDir)
    .pipe(webserver({
      directoryListing: false,
      open: true
    }));
})

// gulp, default gulp behavior (build)
gulp.task('default', ['build']);
