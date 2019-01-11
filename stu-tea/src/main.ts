// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import FastClick from 'fastclick'

Vue.config.productionTip = false

// 全局注册
Vue.component('app', App)
// 解决移动端的click延迟300ms问题，具体有没有效果我也不知道
FastClick.attach(document.body);


// tslint:disable-next-line:no-unused-expression
new Vue({
    el: '#app',
    router,
    render: (createElement) => createElement(App)
})
