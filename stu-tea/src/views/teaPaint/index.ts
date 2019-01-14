import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import MathHeader from '@/components/math-header/math-header.vue'
import ArticleComp from '../../assets/js/articleComp'
import MyCanvas from '../../assets/js/canvas/myCanvas'
import { Socket, EIdentity } from '../../assets/js/socket'
import $ from 'jquery'
import config from '../../common/config'
import { Eapi } from '../../common/api'
import ajax from '../../common/customAjax'

@Component({
    components: {
        MathHeader
    }
})
export default class TeaPaint extends Vue {
    private article: ArticleComp;
    private canvas: MyCanvas;
    private socket: Socket;

    constructor () {
        super();
        this.socket = new Socket(EIdentity.teacher);
    }

    data () {
        return {
            mathHeader: {
                btnFlag: true,
                headerName: '画板',
                btnName: '返回'
            },
            articleHeight: 0,
            infoFlag: false
        }
    }

    // 设置inforMask的宽度和高度
    @Watch('infoFlag')
    infoMaskVetical () {
        this.$nextTick(function () {
            let inforAttr = this.getInforWH();
            let maskAttr = this.getMaskWH();
            let top = (inforAttr.height - maskAttr.height) / 2;
            let left = (inforAttr.width - maskAttr.width) / 2;

            top = top < 0 ? 0 : top;
            left = left < 0 ? 0 : left;

            $('.inforMask').css({
                'top': top + 'px',
                'left': left + 'px'
            });
        });
    }

    // 设置article标签的高度
    setArticle (): void {
        this.article = new ArticleComp(this.$refs.content as HTMLElement);
        this.article.setAttr();
    }

    // 获取article标签的高度
    getArtHeig (): void {
        this.$data.articleHeight = this.article.getArtHeig();
    }

    // 获取.box_content的宽高
    boxContent (): {width: number, height: number} {
        let node = $('.box_content');
        return { width: node.width(), height: node.height() };
    }

    // 获取inforPanel的宽度和高度
    getInforWH (): { width: number, height: number } {
        return {
            width: $('aside.inforPanel').width(),
            height: $('aside.inforPanel').height()
        };
    }

    // 获取infoMask的宽度和高度
    getMaskWH (): { width: number, height: number } {
        return {
            width: $('.inforMask').width() + parseFloat($('.inforMask').css('padding-left')) * 2,
            height: $('.inforMask').height() + parseFloat($('.inforMask').css('padding-top')) * 2
        };
    }

    // 设置inforMask的显示或隐藏
    isShowMask () {
        if (this.$data.infoFlag) {
            // 隐藏
            this.$data.infoFlag = false;
        } else {
            // 显示
            this.$data.infoFlag = true;
        }
    }

    // 当窗口改变时，article标签的高度也随着改变
    winChange (): void {
        let that = this;
        window.onresize = function () {
            that.setArticle();
            that.getArtHeig();
            that.structure();
            that.infoMaskVetical();
            that.setPaintAttr();
        };
    }

    // 设置结构
    structure (): void {
        let assistWidth = $('article.assistPanel').width();
        let assistHeight = $('article.assistPanel').height();
        let toolWidth = $('article.toolPanel').width();
        $('article.questPanel').css('width', (this.boxContent().width - assistWidth - 2) + 'px');
        $('article.canvasPanel').css('width', (this.boxContent().width - toolWidth - 2) + 'px');
        $('article.canvasPanel').css('height', (this.boxContent().height - assistHeight - 2) + 'px');
        $('article.toolPanel').css('height', (this.boxContent().height - assistHeight - 2) + 'px');
    }

    // 设置画板的宽度和高度
    setPaintAttr (): void {
        let width = $('article.canvasPanel').width();
        let height = $('article.canvasPanel').height();
        $('#myCanvas').attr({ width, height });
    }

    // 画板
    paint (): void {
        this.canvas = new MyCanvas();
        this.canvas.startListen();
        this.canvas.moveListen();
        this.canvas.endListen();
        this.canvas.clickListen();
    }

    // 接收socket发送的消息
    messageQid (): void {
        let that = this;

        this.socket.message((data: string) => {
            let tempData: { status: boolean, qid: number } = JSON.parse(data);

            that.pushControl(tempData.status, tempData.qid).then(qid => {
                // 发送ajax获取试题数据
                that.getQues(qid);
            }).catch(() => {});
        });
    }

    // 如果为推送中，则控制界面，如果为推送结束，则不控制界面
    pushControl (status: boolean, qid: number): Promise<number> {
        if (!status) {
            // 推送结束
            // 为返回按钮添加show类名
            $('header>button').attr('class', '').addClass('show');

            return Promise.reject();
        } else {
            // 推送中
            // 为返回按钮添加noShow类名
            $('header>button').attr('class', '').addClass('noShow');

            return Promise.resolve(qid);
        }
    }

    // ajax获取试题数据
    getQues (qid: number) {
        let postURL = 'http://' + config().host + ':' + config().post + '/' + config().project + '/' + config().api + '/' + Eapi.quesInfoOfQid
        let that = this;

        ajax(postURL, { 'q_id': qid }).then(data => {
            if ((data['data'] as []).length !== 0) {
                let tempData = data['data'][0];
                $('article.questPanel>div').text(tempData['q_content']);
                let board = [];
                try {
                    board = JSON.parse(tempData['q_board']);
                } catch (error) {
                    board = [];
                }
                that.canvas.initData(board);
            }
        }).catch((mess) => {
            // 连接失败
        });
    }

    // 保存画板内容
    private saveData (): void {
        let image = new Image();
        let imageCont = (document.getElementById('myCanvas') as HTMLCanvasElement).toDataURL('image/png');

        let chars = ['0','a','b','1','c','d','2','e','f','3','g','h','4','i','j','5','k','l','6','m','n','7','o','p','8','q','r','9','s','t','u','v','w','x','y','z'];
        let res = '';
        for (let i = 0; i < 10; i++) {
            res += chars[Math.ceil(Math.random() * 35)];
        }
        let imgName = new Date().getTime() + res;

        // 先保存到本地，再发送到后端
        let bitmap = new window['plus'].nativeObj.Bitmap('test');
        bitmap.loadBase64Data(imageCont, function() {
            bitmap.save('_doc/' + imgName + '.png', {
                overwrite: true,
                format: 'png',
                quality: 100
            }, function(i) {
                mui.alert('图片保存成功');
            }, function(e) {
                mui.alert('保存图片失败');
            });
        }, function(e) {
            mui.alert('加载图片失败');
        });

        this.imgUpload({
            'imgName': imgName,
            'imgData': imageCont
        }, function(data) {
        }, function(xml, status, err) {
            mui.alert('请检查网络是否连接');
        });
    }

    // 上传图片
    imgUpload (data: {}, succCall: Function, errCall: Function) {
        let postUrl = 'http://' + config().host + ':' + config().post + '/' + config().project + '/' + config().api + '/' + Eapi.paintsaveImage;
        ajax(postUrl, data).then((data) => {
            succCall(data);
        }).catch(() => {
            errCall();
        });
    }

    // mui.plus
    muiPlusReady (): void {
        let that = this;

        mui.plusReady(function() {
            document.getElementById('saveDataBtn').addEventListener('click', function() {
                that.saveData();
            });
        });

        mui.back = function () {};
    }

    mounted () {
        this.messageQid();  // 接收socket发送的消息
        this.setArticle();  // 设置article高度
        this.getArtHeig();  // 获取article高度
        this.structure();  // 设置结构
        this.infoMaskVetical();  // 设置inforMask的宽度和高度
        this.setPaintAttr(); // 设置画板的宽度和高度
        this.winChange();
        this.paint();  // 画板
        this.muiPlusReady();  // mui
    }
}
