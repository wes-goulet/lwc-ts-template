const lwcLoaderPath = require.resolve("./lwc-loader.js");
const path = require("path");
const fs = require("fs");

const lwcNamespace = "template";

const lwcAliases = fs.readdirSync("./src/template").reduce((seed, dirName) => {
    seed[`${lwcNamespace}/${dirName}`] = path.resolve(
        "./src/template",
        dirName,
        `${dirName}.ts`
    );
    return seed;
}, {});

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "sourcemap",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".css", ".html"],
        alias: {
            lwc: "@lwc/engine",
            "wire-service": "@lwc/wire-service",
            ...lwcAliases
        }
    },
    module: {
        rules: [
            {
                test: /template(.)+\.(css|html)$/,
                loader: lwcLoaderPath,
                options: {
                    namespace: lwcNamespace
                }
            },
            {
                test: /\.(tsx?)$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-typescript"],
                    plugins: ["@lwc/babel-plugin-component"]
                }
            }
        ]
    }
};
