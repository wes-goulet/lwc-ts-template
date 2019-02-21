# lwc-ts-template

A template for writing a standalone LWC app in Typescript.

## Run locally

```bash
npm install
npm start
```

## To build for prod (minified and no source maps)

```bash
npm run build-prod
```

## How it works

The build has 2 steps... the first step runs the typescript code through babel to strip the typescript types, putting the resulting JS code in a folder called "no-types". Then rollup takes the JS from "no-types" and runs it through the LWC compiler (via rollup plugin) to compile the LWC code into good old JS, putting the final bundle into the "dist" folder.

NOTE: we can't just use the typescript compiler because it transpiles the `@wires` that LWC uses, whereas babel won't change the decorator syntax.
