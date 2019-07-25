const { transform } = require('@lwc/compiler');
const path = require('path');

module.exports = function lwcLoader(source) {
    const { resourcePath } = this;
    const ext = path.extname(resourcePath);
    const basename = path.basename(resourcePath, ext);
    const extMap = {
        ...this.query.extMap,
        '.js': '.js',
        '.css': '.css',
        '.html': '.html',
    };
    const mappedExt = extMap[ext];

    if (mappedExt === undefined) {
        throw new Error(
            `[lwc-loader] Cannot transform file with extension "${ext}". Please map "${ext}" to ".js", ".html" or ".css" in options.extMap`
        );
    }

    return transform(source, path.basename(resourcePath).replace(ext, mappedExt), {
        namespace: this.query.namespace,
        name: basename,
    }).then(data => {
        return data.code;
    });
};
