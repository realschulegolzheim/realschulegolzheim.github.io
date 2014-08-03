'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			output: [ '_site/*']
		},

		jekyll: {
			dist: {
				options: {
					config: '_config.yml'
				}
			}
		},

		ftp_push: {
			prod: {
				options: {
					authKey: "schulenduesseldorfde",
					host: "schulen.duesseldorf.de",
					dest: "/httpdocs/v2",
					port: 21
				},
				files: [
					{
						expand: true,
						cwd: '_site',
						src: [
							"**"
						]
					}
				]
			}
		},

		'ftp-deploy': {
			prod: {
				auth: {
					host: 'schulen.duesseldorf.de',
					port: 21,
					authKey: 'schulenduesseldorfde',
					authPath : ".ftpauth"
				},
				src: '_site',
				dest: '/httpdocs/v2',
				exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-jekyll");
	grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	grunt.registerTask("default", ['clean']);
	grunt.registerTask("jekyll", ['jekyll:dist']);
	/*grunt.registerTask("f", ['ftp_push:prod']);*/
	grunt.registerTask("ftp", ['ftp-deploy:prod']);
};
