/* eslint-env node */
import lwcCompiler from "@lwc/rollup-plugin";
import replace from "rollup-plugin-replace";
import fs from "fs-extra";
import path from "path";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import alias from "rollup-plugin-alias";
const resolve = require("rollup-plugin-node-resolve");

const projectPackage = require("./package.json");
const distFolderName = "dist";
const dist = path.resolve(__dirname, `./${distFolderName}`);
const publicFolder = path.resolve(__dirname, `./public`);
const isWatching = process.env.ROLLUP_WATCH;

const environment = process.env.build || "development";
const isProduction = environment === "production";

// Start with clean dist folder
fs.removeSync(dist);

// Copy public folder
fs.copySync(publicFolder, dist);

export default {
    input: "no-types/index.js",
    output: {
        file: `${distFolderName}/bundle.js`,
        format: "esm"
    },
    plugins: [
        lwcCompiler({
            stylesheetConfig: { customProperties: { allowDefinition: true } },
            resolveFromPackages: false
        }),
        alias({
            lwc: require.resolve("@lwc/engine/dist/modules/es2017/engine.js")
        }),
        resolve({
            modulesOnly: true
        }),
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
        isProduction && terser({ sourcemap: false }),
        isWatching &&
            serve({
                contentBase: dist,
                open: true,
                port: 3000
            })
    ].filter(Boolean)
};
