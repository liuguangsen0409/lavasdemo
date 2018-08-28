/**
 * @file lavas config
 * @author liuguangsen0409(liuguangsen@renrenche.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	build: {
		// 切换spa单页应用和ssr服务端渲染两种编译模式
		ssr: false,

		// 最终构建产物的输出地址，必须为绝对路径
		path: BUILD_PATH,

		// 在静态资源路径之前添加的前缀，默认是/
		publicPath: '/',

		// webpack可以指定输出静态资源的文件名，其中可以使用例如[hash]这样的模板字符串
		// filenames: {},

		// lavas内部配置webpack规则，使用babel-loader处理js文件
		// babel: {},

		// 在使用ExtractTextWebpackPlugin从js中提取样式时，需要设置Loader和Plugin，开发模式中关闭，生产模式中打开
		// cssExtract: true,

		// 是否需要对css文件进行压缩以及生成source-map，这两个参数最终将传递给css-loader
		// cssMinimize: true,
		// cssSourceMap: true,

		// 是否需要对 JS 文件生成 source-map，便于开发模式调试以及生产环境排查错误，默认开启
		// jsSourceMap: true,

		// Webpack Bundle Analyzer 提供了可视化图表这样的直观方式，帮助开发者分析构建产物中可能出现的问题，例如重复引入、不必要的依赖，默认关闭
		// bundleAnalyzerReport: true,

		// 在构建时我们常常需要使用全局常量，在 Webpack 中可以通过 DefinePlugin 插件定义这些常量
		// Lavas提供三组命名空间，分别是SSR中服务端使用的server，客户端使用的client以及两者共用的base
		// defines: {
		// 	base: {},
		// 	client: {},
		// 	server: {}
		// },

		// alias定义路径的简写别名
		// Lavas提供了alias下三组命名空间，分别是SSR中服务端使用的server，客户端使用的client以及两者共用的base
		// 另外，Lavas已经内置了两组别名，开发者不需要重复定义
		// @: '' 指向项目根目录
		// $: '' 指向.lavas目录
		// alias: {
		// 	base: {},
		// 	client: {},
		// 	server: {}
		// },

		// 存放webpack构建时的各种插件
		// 对于开发者自定义的插件，Lavas提供了plugins下三组命名空间，分别是SSR中服务端使用的server，客户端使用的client以及两者共用的base
		// plugins: {
		// 	base: [],
		// 	client: [],
		// 	server: []
		// },

		// extend 方法适合对于 Webpack 配置对象进行简单扩展的场景，例如添加插件
		// config为webpack配置对象，options.type是webpack配置对象类型，一共有三种：client供客户端使用，server供服务端使用，base两者同时生效
		// extend(config, {type, env}) {
		//	// 在客户端和服务端同时生效，等同于 type === 'client' || type === 'server'
		// 	if (type === 'base') {
    //     let vueRule = config.module.rules[0];
    //     vueRule.use.push({
    //         loader: 'vue-style-variables-loader',
    //         options: {
    //             variablesFiles: [
    //                 path.join(__dirname, 'assets/styles/variables.styl')
    //             ]
    //         }
    //     });
    // 	}
		// }

		// extendWithWebpackChain

		// 在SSR模式下是否启用gzip，通过内置的compress中间件实现，Lavas默认在开发模式中关闭这一特性，在生产环境中打开，只有在SSR模式下生效
		// compress: false,

		// 需要将部分特定的依赖（node_modules）打包进来，这时就需要使用白名单了，只有在SSR模式下生效
		// nodeExternalsWhitelist: [],
		
		// 在SSR模式下，Lavas除了将构建产物输出到例如dist文件夹中，还可以将例如node_modules，线上脚本等文件拷贝到里面。这样dist文件夹可以作为一个可单独运行的包，移动到任意位置
		ssrCopy: isDev ? [] : [
			{
				src: 'server.prod.js'
			},
			{
				src: 'package.json'
			}
		],

		// 监控自定义文件，在它们发生修改时触发重新编译（类似自定义的热加载）
		// watch: ['/foo/bar'],

		// 对于以上配置项，如果需要在开发模式和生产模式启用不同的值，可以使用两个我特殊的配置项development和production
		// 例如
		// development: {
		// 	build: {
		// 		cssExtract: false
		// 	}
		// },
		// production: {
		// 	build: {
		// 		cssExtract: true
		// 	}
		// }
	},
	// 路由配置项
	router: {
		// 路由模式 hash和histroy SSR模式不支持hash
		mode: 'history',
		// 基准路由
		base: '/',
		// 过渡动画
		pageTransition: {
			// type为必填项，渐隐渐现效果必须填写fade
			type: 'fade',
			transitionClass: 'fade'
			// 左右切换效果
			// type: 'slide',
			// 选填，左滑Vue Transition的类名，对应transition样式部分在core/App.vue中
			// slideLeftClass: 'slide-left',
			// 选填，右滑Vue Transition的类名
			// slideRightClass: 'slide-right',
			// 选填，访问以下路由永远右滑后退
			// alwaysBackPages: ['index'],
			// 选填，访问以下路由永远左滑前进
			// alwaysForwardPages: []

			// 除以上两种内置的切换效果，开发者还可通过pageTransition自定义动画
		},

		// 重写路由对象
		// rewrite: [{
		// 	from: '/detail',
		// 	to: '/rewrite/detail'
		// }],
		// routes: []
	},
	// 
	serviceWorker: {
		// 生成service-worker.js所需模板文件所在位置
		swSrc: path.join(__dirname, 'core/service-worker.js'),

		// 生成的service-worker.js的存放位置，此处放在dist下面
		swDest: path.join(BUILD_PATH, 'service-worker.js'),

		// 生成的service-worker.js在sw-register.js中默认会使用publicPath进行完整可访问路径拼接，默认不开启
		// swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
		
		// 指定需要预缓存的静态文件的目录
		globDirectory: BUILD_PATH,
		
		// 相对于globDirectory指定的目录，指出哪些文件需要被预缓存，可以使用通配符，但是将sw-register.js和map排除在外
		globPatterns: [
			'**/*.{html,js,css,eot,svg,ttf,woff}'
		],

		// 相对于globDirectory指定的目录，指出哪些文件不需要被预缓存，可以使用通配符
		globIgnores: [
			'sw-register.js',
			'**/*.map'
		],

		// 
		appshellUrl: '/appshell',

		// Workbox会将符合上述glob开头的三个配置项条件的所有静态文件逐个生成一个版本号(称为revision)存入缓存
		// 后续在面对同名文件时比较缓存中的版本号决定是否更新
		// 但Lavas生成的静态资源文件绝大部分是在文件名中带有hash的(如/dist/static/css/manifest.5e1ead3.js)
		// 一旦文件内容更新hash也会更新，因此Workbox内置的版本号就不再需要了
		// 所以可以省略这个生成和比较的过程从而提升构建速度
		// 因为Lavas生成的hash 8位的，所以例子中的正则也正匹配8位字母数字
		dontCacheBustUrlsMatching: /\.\w{8}\./
	}
};
