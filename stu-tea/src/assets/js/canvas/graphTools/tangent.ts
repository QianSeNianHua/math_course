import { InterTangent, Tools, InterCircular } from '../interface/inter-toolslib';
import { ToolsName, Attribute } from '../enum/enum-configlib';
import { RePaint } from '../rePaint';
import { ButtonListen } from '../buttonListen';
import { CanvasData } from '../canvasData';
import { CanvasChoosed } from '../canvasChoosed';
import { Intersect } from '../intersect';

/**
 * 切线
 */
export class Tangent implements InterTangent {
    flag: ToolsName;  // 标志
    x: number;  // 起点x的坐标
    y: number;  // 起点y的坐标
    r: number;  // 半径
    lock: boolean;  // true表示后台录入的，false表示学生端绘画的(默认)
    isChoosed: boolean;  // true表示图形被选中，false表示未被选中
    angle: number;  // 表示角，单位为弧度
    insePointX: number;  // 表示切线与圆相交的x坐标
    insePointY: number;  // 表示相交的y坐标
    anticlockwise?: boolean;  // false表示顺时针(默认)，true表示逆时针

    private isMobild: boolean;  // true为移动端，false为PC端
    private myCanvas: CanvasRenderingContext2D;  // canvas对象
    private myCanvasNode: HTMLElement;  // canvas节点
    private rePaint: RePaint;  // 重绘图形
    private eventFlag: boolean;  // true表示开始点击，false表示结束点击
    private eventCount: number;  // 点击次数
    private buttonListen: ButtonListen;  // 按钮监听事件
    private canvasData: CanvasData;  // canvas图形数据
    private canvasChoosed: CanvasChoosed;  // 选中图形
    private intersect: Intersect;  // 相交
    private cirData;  // 临时存放圆的数据

    constructor(isMobild: boolean, myCanvas: CanvasRenderingContext2D, myCanvasNode: HTMLElement, rePaint: RePaint, buttonListen: ButtonListen, canvasData: CanvasData, canvasChoosed: CanvasChoosed, intersect: Intersect) {
        this.flag = ToolsName.tangent;
        this.isMobild = isMobild;
        this.myCanvas = myCanvas;
        this.myCanvasNode = myCanvasNode;
        this.eventFlag = false;
        this.eventCount = 0;
        this.anticlockwise = false;
        this.canvasData = canvasData;
        this.rePaint = rePaint;
        this.buttonListen = buttonListen;
        this.isChoosed = false;
        this.canvasChoosed = canvasChoosed;
        this.intersect = intersect;
    }

    /**
     * 监听mousedown事件
     * 第一次点击确定起点，第二次点击确定线段
     * @param: e Event事件
     */
    startCallBack(e: Event): void {
        if (!this.eventFlag && this.eventCount === 0) {
            // 画切线
            this.eventFlag = true;
            this.eventCount = 1;

            let x = 0, y = 0;
            if (this.isMobild) {
                // 移动端
                let event: TouchEvent = (e as TouchEvent);

                x = event.touches[0].clientX - this.myCanvasNode.getBoundingClientRect().left;
                y = event.touches[0].clientY - this.myCanvasNode.getBoundingClientRect().top;
            } else {
                // PC端
                let event: MouseEvent = (e as MouseEvent);

                x = event.clientX - this.myCanvasNode.getBoundingClientRect().left;
                y = event.clientY - this.myCanvasNode.getBoundingClientRect().top;
            }

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            let index = this.canvasChoosed.getIndex();
            this.cirData = (this.canvasData.getData(index[0]) as InterCircular);
            let ao = Math.sqrt(Math.pow((x - this.cirData.x), 2) + Math.pow((y - this.cirData.y), 2));
            let ang = Math.asin(this.cirData.r / ao);
            let ap = Math.cos(ang) * ao;
            let png = Math.atan2((y - this.cirData.y), (x - this.cirData.x));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            let pointx = Math.cos(Math.PI - ang + png) * ap + x;
            let pointy = Math.sin(Math.PI - ang + png) * ap + y;

            // 画相交的点
            this.intersect.repaintPoint();

            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propNSStyle;
            this.myCanvas.lineWidth = Attribute.propWitdh;
            this.myCanvas.moveTo(x, y);
            this.myCanvas.arc(x, y, ap * 2, (Math.PI - ang + png), (Math.PI - ang + png), this.anticlockwise);
            this.myCanvas.stroke();
            this.myCanvas.fillStyle = Attribute.propNFStyle;
            this.myCanvas.moveTo(pointx, pointy);
            this.myCanvas.arc(pointx, pointy, Attribute.propPointR, 0, 2 * Math.PI, false);
            this.myCanvas.fill();
        }
    }

    /**
     * 监听mousemove事件
     * @param: e Event事件
     */
    moveCallBack(e: Event): void {
        if (this.eventFlag && this.eventCount === 1) {
            // 画切线

            let x = 0, y = 0;
            if (this.isMobild) {
                // 移动端
                let event: TouchEvent = (e as TouchEvent);

                x = event.touches[0].clientX - this.myCanvasNode.getBoundingClientRect().left;
                y = event.touches[0].clientY - this.myCanvasNode.getBoundingClientRect().top;
            } else {
                // PC端
                let event: MouseEvent = (e as MouseEvent);

                x = event.clientX - this.myCanvasNode.getBoundingClientRect().left;
                y = event.clientY - this.myCanvasNode.getBoundingClientRect().top;
            }

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            let index = this.canvasChoosed.getIndex();
            this.cirData = (this.canvasData.getData(index[0]) as InterCircular);
            let ao = Math.sqrt(Math.pow((x - this.cirData.x), 2) + Math.pow((y - this.cirData.y), 2));
            let ang = Math.asin(this.cirData.r / ao);
            let ap = Math.cos(ang) * ao;
            let png = Math.atan2((y - this.cirData.y), (x - this.cirData.x));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            let pointx = Math.cos(Math.PI - ang + png) * ap + x;
            let pointy = Math.sin(Math.PI - ang + png) * ap + y;

            // 画相交的点
            this.intersect.repaintPoint();

            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propNSStyle;
            this.myCanvas.lineWidth = Attribute.propWitdh;
            this.myCanvas.moveTo(x, y);
            this.myCanvas.arc(x, y, ap * 2, (Math.PI - ang + png), (Math.PI - ang + png), this.anticlockwise);
            this.myCanvas.stroke();
            this.myCanvas.fillStyle = Attribute.propNFStyle;
            this.myCanvas.moveTo(pointx, pointy);
            this.myCanvas.arc(pointx, pointy, Attribute.propPointR, 0, 2 * Math.PI, false);
            this.myCanvas.fill();
        }
    }

    /**
     * 监听mouseup事件
     * @param: e Event事件
     */
    endCallBack(e: Event): void {
        if (this.eventFlag && this.eventCount === 1) {
            // 画切线，保存数据
            this.eventFlag = false;
            this.eventCount = 0;

            if (this.isMobild) {
                // 移动端
                let event: TouchEvent = (e as TouchEvent);

                this.x = event.changedTouches[0].clientX - this.myCanvasNode.getBoundingClientRect().left;
                this.y = event.changedTouches[0].clientY - this.myCanvasNode.getBoundingClientRect().top;
            } else {
                // PC端
                let event: MouseEvent = (e as MouseEvent);

                this.x = event.clientX - this.myCanvasNode.getBoundingClientRect().left;
                this.y = event.clientY - this.myCanvasNode.getBoundingClientRect().top;
            }

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            let index = this.canvasChoosed.getIndex();
            this.cirData = (this.canvasData.getData(index[0]) as InterCircular);
            let ao = Math.sqrt(Math.pow((this.x - this.cirData.x), 2) + Math.pow((this.y - this.cirData.y), 2));
            let ang = Math.asin(this.cirData.r / ao);
            let ap = Math.cos(ang) * ao;
            let png = Math.atan2((this.y - this.cirData.y), (this.x - this.cirData.x));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            this.insePointX = Math.cos(Math.PI - ang + png) * ap + this.x;
            this.insePointY = Math.sin(Math.PI - ang + png) * ap + this.y;
            this.r = ap * 2;
            this.angle = (Math.PI - ang + png) > (2 * Math.PI) ? (Math.PI - ang + png) % (2 * Math.PI) : (Math.PI - ang + png);

            // 画相交的点
            this.intersect.repaintPoint();

            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propDSStyle;
            this.myCanvas.lineWidth = Attribute.propWitdh;
            this.myCanvas.moveTo(this.x, this.y);
            this.myCanvas.arc(this.x, this.y, this.r, this.angle, this.angle, this.anticlockwise);
            this.myCanvas.stroke();
            this.myCanvas.fillStyle = Attribute.propDFStyle;
            this.myCanvas.moveTo(this.insePointX, this.insePointY);
            this.myCanvas.arc(this.insePointX, this.insePointY, Attribute.propPointR, 0, 2 * Math.PI, false);
            this.myCanvas.fill();

            // 保存切线数据到对应的圆里
            (this.canvasData.getData(this.canvasChoosed.getIndex()[0]) as InterCircular).fanAndRadius.push(this.data());
            // 恢复按钮标志
            this.buttonListen.recoverButtonFlag();

            // 清除canvasChoosed的下标
            this.canvasChoosed.recoverIndex();
        }
    }

    /**
     * 返回坐标数据
     */
    data(): InterTangent {
        return { flag: this.flag, isChoosed: this.isChoosed, lock: false, x: this.x, y: this.y, r: this.r, angle: this.angle, insePointX: this.insePointX, insePointY: this.insePointY, anticlockwise: this.anticlockwise };
    }
}
