const { override, fixBabelImports, addWebpackAlias, useBabelRc, addBundleVisualizer, addDecoratorsLegacy, addLessLoader } = require('customize-cra')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    useBabelRc(),
    addDecoratorsLegacy(),
    addWebpackAlias({ 'react-dom': '@hot-loader/react-dom', src: resolve('src') }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#005A9B',
            '@btn-default-color': '#005A9B',
        },
    }),
    // addBundleVisualizer({analyzerMode: 'server'})
)
