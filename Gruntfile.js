'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			output: [ '_site/*']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-clean");

	grunt.registerTask("default", ['clean']);
};