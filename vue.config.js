module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    assetsDir: '.',
    indexPath: 'index.html',
    filenameHashing: true,
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: process.env.NODE_ENV !== 'production'
        }
    }
}
