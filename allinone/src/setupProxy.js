const { createProxyMiddleware } = require("../node_modules/http-proxy-middleware/dist/index")


module.exports = app => {
    app.use('/v2/**/',
    createProxyMiddleware(
        {
            target: 'http://14.36.131.85:8080',
            changeOrigin: true,
            withCredentials: false,
        }
    ))
}