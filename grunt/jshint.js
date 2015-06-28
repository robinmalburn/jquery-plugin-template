module.exports = function(grunt) {
    grunt.config('jshint', {
        files: ['src/jquery.plugin.template.js'],
        options: {
            jshintrc: '.jshintrc'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
