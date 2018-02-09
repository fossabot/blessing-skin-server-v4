const webpackConfig = require('../build/webpack.test.conf');

function browsers() {
    const os = process.platform;
    const base =
        process.env.CI && os !== 'linux'
            ? []
            : ['ChromeHeadless', 'FirefoxHeadless'];
    if (process.platform === 'darwin') {
        return base.concat(['Safari']);
    } else if (process.platform === 'win32') {
        return base.concat(['IE']);
    } else {
        return base;
    }
}

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: ['./index.js'],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },

        mime: {
            'text/x-typescript': ['ts']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [process.env.CI ? 'spec' : 'nyan'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: browsers(),

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
