// vue cli 配置

const path = require('path');
const resolve = dir => path.join(__dirname, dir);

console.log(`当前接口环境：${process.env.VUE_APP_API}`);

module.exports = {
	chainWebpack: config => {
		// 配置别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('api', resolve('src/api'))
			.set('components', resolve('src/components'))
			.set('static', resolve('src/static'))

	},
	devServer: {
		port: 8001,
	},
	transpileDependencies: ['uview-ui'],
	// 不输出 map 文件
	productionSourceMap: false
}
