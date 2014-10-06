module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'dev/vendor/ng.min.js',
			'dev/vendor/angular-mocks.js',
			'dev/vendor/md5.min.js',
			'dev/vendor/ng/*.js',
			'dev/init.js',
			'dev/directives/*.js',
			'dev/services/*.js',
			'dev/controllers/*.js',
			'dev/app.js',
			'test/unit/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['Chrome']
	});
};
