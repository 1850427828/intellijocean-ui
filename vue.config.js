module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': { // 匹配访问路径中含有 '/api' 的路径
                target: 'https://sparc-fusion.hqh.wiki', // 目标地址
                // target: 'http://127.0.0.1:8000', // 目标地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 路径重写，去掉请求路径中的'/api'部分
                  }
            }
        },
        // port: 8000
    }
}
