import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier";
import typescript from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [".config/*", "build/**/*", "dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "error", // 콘솔 로그 금지
      "no-var": "error", // var 사용 금지
      "prefer-const": "error", // const 사용 선호
      "no-unused-vars": ["error", { args: "none" }], // 사용하지 않는 변수 금지
      eqeqeq: ["error", "always"], // ===, !== 사용 강제
      "no-debugger": "error", // 디버거 금지
      "no-alert": "error", // alert 사용 금지
      curly: ["error", "all"], // 제어 구조에서 중괄호 사용 강제
      "no-multiple-empty-lines": ["error", { max: 1 }], // 여러 줄의 빈 줄 제한
      "consistent-return": "error", // 함수에서 항상 값을 반환
      "no-shadow": "error", // 외부 범위에 같은 이름의 변수가 있으면 금지
      "no-else-return": "error", // else 블록을 사용하지 않도록
      "prettier/prettier": ["error"], // Prettier 규칙 적용
      ...eslintConfigPrettier.rules, // Prettier 규칙 비활성화
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      // TypeScript 관련 규칙 추가
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "off",
      // 기타 TypeScript 관련 규칙을 추가할 수 있음
    },
  },
];
