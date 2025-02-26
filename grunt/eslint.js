module.exports = function (grunt) {
  grunt.config("eslint", {
    files: ["src/*.js"],
    options: {
      overrideConfigFile: "eslint.config.mjs",
    },
  });

  grunt.loadNpmTasks("grunt-eslint");
};
