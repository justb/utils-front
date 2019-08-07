const proxy = require('http-proxy-middleware')

const filter = function(pathname, req) {
    return pathname.match('^/(api/login|api/try_login|api/logout)')
}

module.exports = function(app) {
    app.use(
        proxy(filter, {
            target: 'https://wepage-retest.wecash.net',
            cookieDomainRewrite: {
                '*': '',
            },
            changeOrigin: true,
        }),
    )

    app.use(
        proxy('/api/external/oss', {
            target: 'http://bi-stage.wecash.net',
            cookieDomainRewrite: {
                '*': '',
            },
            logLevel: 'debug',
            changeOrigin: true,
        }),
    )

    app.use(
        proxy('/api', {
            target: 'http://localhost:8088',
            cookieDomainRewrite: {
                '*': '',
            },
            changeOrigin: true,
        }),
    )

    app.use(
        proxy('/api', {
            target: 'https://finance-mgt-test.wecash.net',
            cookieDomainRewrite: {
                '*': '',
            },
            changeOrigin: true,
        }),
    )
}
