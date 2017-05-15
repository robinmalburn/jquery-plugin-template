module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadTasks('grunt');

    grunt.registerTask('default', ['jshint', 'eslint']);
    grunt.registerTask('test', ['jshint', 'eslint', 'qunit']);
};
