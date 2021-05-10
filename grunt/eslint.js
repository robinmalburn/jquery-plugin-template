module.exports = function(grunt) {
    grunt.config('eslint', {
        files: ['src/*.js'],
        options: {
            configFile: '.eslintrc.json',
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
};
