/* eslint-env node */
import lwcCompiler from "@lwc/rollup-plugin";
import replace from "rollup-plugin-replace";
import fs from "fs-extra";
import path from "path";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import { transform } from "@babel/core";
import babelTsPlugin from "@babel/plugin-transform-typescript";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const projectPackage = require("./package.json");

const distFolderName = "dist";
const dist = path.resolve(__dirname, `./${distFolderName}`);
const publicFolder = path.resolve(__dirname, `./public`);
const isWatching = process.env.ROLLUP_WATCH;

const environment = process.env.build || "development";
const isProduction = environment === "production";

const babelOptions = {
    babelrc: false,
    plugins: [babelTsPlugin],
    parserOpts: {
        plugins: [
            ["decorators", { decoratorsBeforeExport: true }],
            ["classProperties", {}]
        ]
    }
};

function removeTypesPlugin() {
    return {
        name: "ts-removal",
        transform(src, id) {
            if (path.extname(id) === ".ts") {
                const { code, map } = transform(src, babelOptions);
                return { code, map };
            }
        }
    };
}

// Start with clean dist folder
fs.removeSync(dist);

// Copy public folder
fs.copySync(publicFolder, dist);

export default {
    input: "./src/index.ts",
    output: {
        file: `${distFolderName}/bundle.js`,
        format: "es"
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(environment),
            "process.env.ENVIRONMENT": JSON.stringify(environment),
            "process.env.RELEASE_VERSION": JSON.stringify(
                projectPackage.version
            ),
            "process.env.RELEASE_DATE": JSON.stringify(
                new Date().toLocaleDateString("en-US")
            )
        }),
        removeTypesPlugin(),
        lwcCompiler({
            stylesheetConfig: {
                customProperties: { allowDefinition: true }
            },
            rootDir: path.join(__dirname, "./src/modules")
        }),
        resolve({
            modulesOnly: true
        }),
        isProduction && terser({ sourcemap: false }),
        isWatching &&
            serve({
                contentBase: dist,
                open: false,
                port: 3000
            })
    ].filter(Boolean)
};
