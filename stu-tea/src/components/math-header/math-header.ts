import { Vue, Component, Watch } from 'vue-property-decorator'

/**
 * 父组件向此组件传递参数：title, btnName, isShowBtn
 * 此组件向父组件传递参数：
 */
@Component({
    props: ['title', 'btnName', 'isShowBtn']
})
export default class MathHeader extends Vue {
    // 按钮的返回
    retBtn (e: Event): void {
        if (e.srcElement.className === 'show') {
            // 推送结束，可以返回
            this.$router.go(-1);
        } else {
            // 推送中，不可以返回
        }
    }
}
