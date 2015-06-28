module.exports = function(grunt) {
    grunt.config('qunit', {
        all : ['tests/index.html']
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
};
