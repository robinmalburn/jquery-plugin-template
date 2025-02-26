import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        module: "readonly",
        window: "readonly",
        define: "readonly",
      },
    },
  },
];
