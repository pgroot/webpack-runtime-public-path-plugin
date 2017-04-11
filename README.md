# webpack-runtime-public-path-plugin

A plugin that lets you override the Webpack modules public path in webpage runtime.

# Configuration

```
const RuntimePublicPathPlugin = require("webpack-runtime-public-path-plugin")
```

```json
    plugins: [
        ...
        new RuntimePublicPathPlugin({
            runtimePublicPath: "'/foo/bar/'"
        })
        ...
    ]
```

# Result

```js
/******/        // __webpack_public_path__
/******/        __webpack_require__.p = "/dist/";

/******/        // Dynamic assets path override (runtime-public-path-webpack-plugin)
/******/        __webpack_require__.p = ('/foo/bar/') || __webpack_require__.p;

```