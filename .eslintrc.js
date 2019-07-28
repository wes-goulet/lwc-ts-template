module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint", // this tells eslint to not barf around code formatting because prettier will take of it
        "@salesforce/eslint-config-lwc/recommended"
    ],
    parserOptions: {
        project: "./tsconfig.json"
    },
    rules: {
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/prefer-interface": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@lwc/lwc/no-async-operation": "warn",
        "@lwc/lwc/no-inner-html": "warn",
        "@lwc/lwc/no-document-query": "warn"
    }
};
