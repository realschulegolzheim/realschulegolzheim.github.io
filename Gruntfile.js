'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		'pkg': grunt.file.readJSON("package.json"),
		'clean': {
			'output' : [ '_site/*']
		},
		'jekyll' : {
			'dist' : {
				'options' : {
					'config' : '_config.yml'
				}
			}
		},
		'ftpush' : {
			'prod' : {
				'auth' : {
					'host' : 'schulen.duesseldorf.de',
					'port' : 21,
					'authKey' : 'schulenduesseldorfde'
				},
				'src' : '_site',
				'dest' : '/httpdocs/v2',
				'exclusions' : [
					'path/to/source/folder/**/.DS_Store', 
					'path/to/source/folder/**/Thumbs.db', 
					'path/to/dist/tmp'
				]
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-jekyll");
	grunt.loadNpmTasks("grunt-ftp-deploy");
	grunt.loadNpmTasks("grunt-ftpush");

	grunt.registerTask("default", ["clean"]);
	grunt.registerTask("jekyll", ["jekyll:dist"]);
	grunt.registerTask("ftp", ["ftpush:prod"]);
};