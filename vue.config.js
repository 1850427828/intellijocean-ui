module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/': { // 匹配访问路径中含有 '/api' 的路径
                target: 'https://sparc-fusion.hqh.wiki', // 目标地址
                // target: 'http://172.16.28.106:8000', // 目标地址
                changeOrigin: true,
            }
        },
        // port: 8000
    }
}
