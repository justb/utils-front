const proxy = require('http-proxy-middleware')

const filter = function(pathname, req) {
    return pathname.match('^/(api/login|api/try_login|api/logout)')
}

module.exports = function(app) {
    

    app.use(
        proxy('/api', {
            target: 'http://localhost:8088',
            cookieDomainRewrite: {
                '*': '',
            },
            changeOrigin: true,
        }),
    )

   
}
