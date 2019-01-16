/**
 * Created by GROOT on 2017/4/11.
 */

function RuntimePublicPath(options) {
    this.options = options;
    this._name = 'WebpackRuntimePublicPathPlugin';
}

function buf(path, source) {
    var buf = [];
    buf.push(source);
    buf.push('');
    buf.push('// Dynamic assets path override (webpack-runtime-public-path-plugin)');
    buf.push('__webpack_require__.p = (' + path + ') || __webpack_require__.p;');
    return buf.join('\n');
}

RuntimePublicPath.prototype.apply = function (compiler) {
    const self = this;
    var runtimePublicPathStr = this.options && this.options.runtimePublicPath;
    if (!runtimePublicPathStr) {
        console.error('RuntimePublicPath: no output.runtimePublicPath is specified. This plugin will do nothing.');
        return;
    }

    if (compiler.hooks && compiler.hooks.thisCompilation) {
        compiler.hooks.thisCompilation.tap(self._name, function (compilation) {
            compilation.mainTemplate.hooks.requireExtensions.tap(self._name, function (source, chunk, hash) {
                return buf(runtimePublicPathStr, source)
            });
        });
    } else {
        compiler.plugin('this-compilation', function (compilation) {
            compilation.mainTemplate.plugin('require-extensions', function (source, chunk, hash) {
                return buf(runtimePublicPathStr, source)
            });
        });
    }
};

module.exports = RuntimePublicPath;
