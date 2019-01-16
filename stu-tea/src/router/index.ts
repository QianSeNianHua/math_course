import Vue from 'vue'
import Router from 'vue-router'
import StuIndex from '../views/stuIndex/index.vue'
import StuPaint from '../views/stuPaint/index.vue'
import ImgRecord from '../views/imgRecord/index.vue'
import TeaIndex from '../views/teaIndex/index.vue'
import TeaPaint from '../views/teaPaint/index.vue'
import TeaQuesRecord from '../views/teaQuesRecord/index.vue'

// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            name: 'StuIndex',
            path: '/StuIndex',
            component: StuIndex,
            meta: false
        },
        {
            name: 'StuPaint',
            path: '/StuIndex/StuPaint',
            component: StuPaint,
            meta: false
        },
        {
            name: 'SImgRecord',
            path: '/StuIndex/ImgRecord',
            component: ImgRecord,
            meta: false
        },
        {
            name: 'TeaIndex',
            path: '/',
            component: TeaIndex,
            meta: false
        },
        {
            name: 'TeaPaint',
            path: '/TeaIndex/TeaPaint',
            component: TeaPaint,
            meta: false
        },
        {
            name: 'TeaQuesRecord',
            path: '/TeaIndex/TeaQuesRecord',
            component: TeaQuesRecord,
            meta: false
        },
        {
            name: 'TImgRecord',
            path: '/TeaIndex/ImgRecord',
            component: ImgRecord,
            meta: false
        }
    ]
})
