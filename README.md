# lwc-ts-template

A template for writing a standalone LWC app in Typescript.

## A note about routing strategy

This template uses server-side routing (in other words, it's a Multi Page App, not a SPA). If you want a Single Page App (SPA) then see the [sinlge-page-app-config branch](https://github.com/wes566/lwc-ts-template/tree/single-page-app-config).

You can see the way that the output modules get code split by viewing the source files at https://lwc-ts-template.netlify.com/

## Starting a new project with this template

```
npx degit wes566/lwc-ts-template my-new-lwc
```

## Run locally

```bash
npm install
npm start
```

## To build for prod (minified and no source maps)

```bash
npm run build:prod
```

## How does it work

As of today, the TypeScript Compiler (TSC) does not support emitting the decorator style needed by LWC compiler, so we can't use TSC to compile... instead we use babel 7 to strip the TypeScript types. But we still want type-checking so TSC is used for type-checking (without actually emitting any compiled JS).

## Compatibility

This template, as configured, is for modern browsers that support ES Modules and Web Components. If you need to support older browsers you'll need to adjust the configuration. You can see examples of compat settings [on the lwc-create-app template](https://github.com/muenzpraeger/lwc-create-app/blob/master/packages/lwc-create-app/templates/src/client/index.non-wc.js) and [on the lwc-todomvc sample](https://github.com/salesforce/lwc-todomvc/blob/master/scripts/rollup.config.js).
