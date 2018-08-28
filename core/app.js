/**
 * @file entry
 * @author liuguangsen0409(liuguangsen@renrenche.com)
 * 创建整个项目的vue实例，引用其他vue相关的内容（路由规则，vue组件，vuex store等），被entry-server.js和entry-client.js使用（类似vue项目的main.js）
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';

Vue.use(Meta);

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
