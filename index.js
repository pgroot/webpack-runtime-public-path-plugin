/**
 * Created by GROOT on 2017/4/11.
 */

function RuntimePublicPath(options) {
    this.options = options
}
RuntimePublicPath.prototype.apply = function(compiler) {
    var runtimePublicPathStr = this.options && this.options.runtimePublicPath;
    if (!runtimePublicPathStr) {
        console.error('RuntimePublicPath: no output.runtimePublicPath is specified. This plugin will do nothing.');
        return;
    }
    compiler.plugin('this-compilation', function(compilation) {
        compilation.mainTemplate.plugin('require-extensions', function(source, chunk, hash) {
            var buf = [];
            buf.push(source);
            buf.push('');
            buf.push('// Dynamic assets path override (webpack-runtime-public-path-plugin)');
            buf.push('__webpack_require__.p = (' + runtimePublicPathStr + ') || __webpack_require__p;');
            return buf.join('\n');
        });
    });
};

module.exports = RuntimePublicPath;