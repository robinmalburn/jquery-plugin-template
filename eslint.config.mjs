import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
    },
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        module: "readonly",
        window: "readonly",
        define: "readonly",
      },
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["test/**/*.mjs"],
    languageOptions: {
      globals: {
        global: "readonly",
        describe: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
        it: "readonly",
      },
    },
  },
];
