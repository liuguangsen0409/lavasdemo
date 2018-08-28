/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author liuguangsen0409(liuguangsen@renrenche.com)
 * Lavas 内部使用 Workbox 进行 Service Worker 的管理和生成。/core/service-worker.js 用作 Workbox 生成 service-worker.js 的模板
 */

/* globals WorkboxSW */

const workboxSW = new WorkboxSW({
    // 指定应用的缓存id，这回最终影响到缓存的名称
    cacheId: 'lavas-cache',

    // 指明什么样的请求参数应该被忽略，可以用正则进行匹配
    ignoreUrlParametersMatching: [/^utm_/],
    
    // 在Service Worker的install阶段完成后无需等待，立即激活，等同于self.skipWaiting()
    skipWaiting: true,

    // 在Service Worker的active阶段让所有没被控制的页面受控，等同于self.clients.claim()
    clientsClaim: true
});

// Define precache injection point.
// 与缓存的文件会经过WorkboxWebpackPlugin自动插入到这里，本地构建后查看有惊喜
workboxSW.precache([]);

/**
 * example runningCache with api
 * 设置动态缓存规则
 * Workbox提供的registerRoute方法接受两个参数，第一个是匹配请求url的正则表达式，第二个是内置的缓存策略
 * 关于缓存策略的含义，可以参考https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests
 * 
 * 动态缓存的注册顺序：越后注册的规则将越先匹配
 */
// workboxSW.router.registerRoute(/^https:\/\/lavas\.baidu\.com\/some\/api/,
//     workboxSW.strategies.networkFirst());


/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
// workboxSW.router.registerRoute(/^https:\/\/cdn\.baidu\.com/i,
//     workboxSW.strategies.cacheFirst({
//         cacheName: 'lavas-cache-images',
//         cacheExpiration: {
//             maxEntries: 100,
//             maxAgeSeconds: 7 * 24 * 60 * 60
//         },
//         cacheableResponse: {
//             statuses: [0, 200]
//         }
//     })
// );

// 为雅虎天气的 URL 设定了 networkFirst 缓存策略，在网络正常时会请求网络并更新缓存；否则会使用缓存内容。配合预缓存了的所有静态文件，站点就拥有了离线访问能力
workboxSW.router.registerRoute(new RegExp('https://query\.yahooapis\.com/v1/public/yql'),
	workboxSW.strategies.networkFirst())
