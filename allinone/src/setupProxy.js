const { createProxyMiddleware } = require("../node_modules/http-proxy-middleware/dist/index")


module.exports = app => {
    app.use('/v2/**/',
    createProxyMiddleware(
        {
            target: 'http://3.39.95.217:8080',
            changeOrigin: true,
            withCredentials: false,
        }
    ))
}