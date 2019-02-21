/* eslint-env node */
import lwcCompiler from "@lwc/rollup-plugin";
import replace from "rollup-plugin-replace";
import fs from "fs-extra";
import path from "path";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";

const distFolderName = "dist";
const dist = path.resolve(__dirname, `./${distFolderName}`);
const publicFolder = path.resolve(__dirname, `./public`);
const isWatching = process.env.ROLLUP_WATCH;

// Start with clean dist folder
fs.removeSync(dist);

// Copy public folder
fs.copySync(publicFolder, dist);

const env = process.env.build;

export default {
    input: "no-types/index.js",
    output: {
        file: `${distFolderName}/bundle.js`,
        format: "iife",
        name: "Main"
    },
    plugins: [
        lwcCompiler(),
        replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
        env !== "dev" && terser({ sourcemap: false }),
        isWatching &&
            serve({
                contentBase: dist,
                open: true,
                port: 3000
            })
    ].filter(Boolean)
};
