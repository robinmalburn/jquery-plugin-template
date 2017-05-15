module.exports = function(grunt) {
    grunt.config('eslint', {
        files: ['src/jquery.plugin.template.es6.js'],
        options: {
            configFile: '.eslintrc.json',
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
};
