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
    cirX: number;  // 表示依赖的圆的⚪💗的x坐标
    cirY: number;  // 表示依赖的圆的⚪💗的y坐标
    cirR: number;  // 表示依赖的圆的半径
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

            x += Attribute.mouseOffset;

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            let index = this.canvasChoosed.getIndex();
            let cirData = (this.canvasData.getData(index[0]) as InterCircular);
            this.cirX = cirData.x;
            this.cirY = cirData.y;
            this.cirR = cirData.r;
            let ao = Math.sqrt(Math.pow((x - this.cirX), 2) + Math.pow((y - this.cirY), 2));
            let ang = Math.asin(this.cirR / ao);
            let ap = parseFloat(((Math.cos(ang) * ao) / Attribute.unitProp).toFixed(1)) * Attribute.unitProp;
            if (ap < (Attribute.unitProp / 2)) {
                ap = Attribute.unitProp / 2;
            }
            let r = ap * 2;
            let png = Math.atan2((y - this.cirY), (x - this.cirX));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            let angle = (Math.PI - ang + png);
            angle = (angle >= (2 * Math.PI)) ? (angle - 2 * Math.PI) : angle;
            let pointx = Math.cos(angle) * ap + x;
            let pointy = Math.sin(angle) * ap + y;

            // 画相交的点
            this.intersect.repaintPoint();

            // 画切线
            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propNSStyle;
            this.myCanvas.lineWidth = Attribute.propWitdh;
            this.myCanvas.moveTo(x, y);
            this.myCanvas.arc(x, y, r, angle, angle, this.anticlockwise);
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

            x += Attribute.mouseOffset;

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            let ao = Math.sqrt(Math.pow((x - this.cirX), 2) + Math.pow((y - this.cirY), 2));
            let oapAngle = Math.asin(this.cirR / ao);
            let ap = parseFloat(((Math.cos(oapAngle) * ao) / Attribute.unitProp).toFixed(1)) * Attribute.unitProp;
            if (ap < (Attribute.unitProp / 2)) {
                ap = Attribute.unitProp / 2;
            }
            let r = ap * 2;
            let png = Math.atan2((y - this.cirY), (x - this.cirX));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            let angle = (Math.PI - oapAngle + png);
            angle = (angle >= (2 * Math.PI)) ? (angle - 2 * Math.PI) : angle;
            let pointx = Math.cos(angle) * ap + x;
            let pointy = Math.sin(angle) * ap + y;

            let value = parseFloat((r / Attribute.unitProp).toFixed(1));

            // 画相交的点
            this.intersect.repaintPoint();

            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propNSStyle;
            this.myCanvas.lineWidth = Attribute.propWitdh;
            this.myCanvas.moveTo(x, y);
            this.myCanvas.arc(x, y, r, angle, angle, this.anticlockwise);
            this.myCanvas.stroke();
            this.myCanvas.fillStyle = Attribute.propNFStyle;
            this.myCanvas.moveTo(pointx, pointy);
            this.myCanvas.arc(pointx, pointy, Attribute.propPointR, 0, 2 * Math.PI, false);
            this.myCanvas.fill();

            // 画尺子
            this.myCanvas.beginPath();
            this.myCanvas.strokeStyle = Attribute.propDSStyle;
            this.myCanvas.lineWidth = 2;
            this.myCanvas.moveTo(x, y);
            let rulep = this.rotatexy(x, y, 0, 20, angle);
            this.myCanvas.lineTo(rulep.x, rulep.y);
            rulep = this.rotatexy(x, y, r, 20, angle);
            this.myCanvas.lineTo(rulep.x, rulep.y);
            rulep = this.rotatexy(x, y, r, 0, angle);
            this.myCanvas.lineTo(rulep.x, rulep.y);
            this.myCanvas.strokeStyle = Attribute.propDSStyle;
            this.myCanvas.lineWidth = 2;
            for (let i = 10; i < r; i += 10) {
                rulep = this.rotatexy(x, y, i, 0, angle);
                this.myCanvas.moveTo(rulep.x, rulep.y);
                rulep = this.rotatexy(x, y, i, 5, angle);
                this.myCanvas.lineTo(rulep.x, rulep.y);
                i += 10;
                if (i < r) {
                    rulep = this.rotatexy(x, y, i, 0, angle);
                    this.myCanvas.moveTo(rulep.x, rulep.y);
                    rulep = this.rotatexy(x, y, i, 10, angle);
                    this.myCanvas.lineTo(rulep.x, rulep.y);
                }
            }
            this.myCanvas.stroke();

            // 画文本
            this.myCanvas.save();
            this.myCanvas.beginPath();
            this.myCanvas.translate(x, y);
            this.myCanvas.rotate(angle);
            this.myCanvas.font = Attribute.propFont;
            this.myCanvas.fillStyle = Attribute.propDFStyle;
            this.myCanvas.fillText(value + 'cm', r / 2 - 22, -30);
            this.myCanvas.restore();
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

            this.x += Attribute.mouseOffset;

            // 清除画布并重绘图形
            this.rePaint.clearCanvas();
            this.rePaint.rePaint();

            // 设鼠标位置为点a，圆心为o，则ao表示ao之间的直线
            // 设切点为p，则ang表示∠oap，ap表示ap之间的直线
            // png表示右边x坐标轴到直线ao之间的角度
            // (Math.PI - ang + png) 表示右边x坐标轴到直线ap之间的角度
            let ao = Math.sqrt(Math.pow((this.x - this.cirX), 2) + Math.pow((this.y - this.cirY), 2));
            let oapAngle = Math.asin(this.cirR / ao);
            if (isNaN(oapAngle)) {
                // 恢复按钮标志
                this.buttonListen.recoverButtonFlag();

                // 清除canvasChoosed的下标
                this.canvasChoosed.recoverIndex();

                return;
            }
            let ap = parseFloat(((Math.cos(oapAngle) * ao) / Attribute.unitProp).toFixed(1)) * Attribute.unitProp;
            if (ap < (Attribute.unitProp / 2)) {
                ap = Attribute.unitProp / 2;
            }
            let png = Math.atan2((this.y - this.cirY), (this.x - this.cirX));
            png = (png >= 0) ? png : (2 * Math.PI + png);
            let angle = (Math.PI - oapAngle + png);
            this.angle = (angle >= (2 * Math.PI)) ? (angle - 2 * Math.PI) : angle;
            this.insePointX = Math.cos(this.angle) * ap + this.x;
            this.insePointY = Math.sin(this.angle) * ap + this.y;
            this.r = ap * 2;
            let bx = Math.cos(this.angle) * this.r + this.x;
            let by = Math.sin(this.angle) * this.r + this.y;

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
            this.myCanvas.moveTo(this.x, this.y);
            this.myCanvas.arc(this.x, this.y, Attribute.propPointR, 0, 2 * Math.PI, false);
            this.myCanvas.fill();
            this.myCanvas.moveTo(bx, by);
            this.myCanvas.arc(bx, by, Attribute.propPointR, 0, 2 * Math.PI, false);
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
     * 旋转后的坐标
     * @param ox 原点x坐标
     * @param oy 原点y坐标
     * @param px 所求点的x坐标，此时以线段原点O为坐标原点，所求点P在x坐标上
     * @param py 所求点的y坐标，同上，x坐标向上为正，向下为负
     * @param angle 角度，顺时针
     */
    private rotatexy(ox: number, oy: number, px: number, py: number, angle: number): {x: number, y: number} {
        let x = px * Math.cos(angle) + py * Math.sin(angle) + ox;
        let y = px * Math.sin(angle) - py * Math.cos(angle) + oy;
        return { x, y };
    }

    /**
     * 返回坐标数据
     */
    data(): InterTangent {
        return { flag: this.flag, isChoosed: this.isChoosed, lock: false, x: this.x, y: this.y, r: this.r, angle: this.angle, insePointX: this.insePointX, insePointY: this.insePointY, cirX: this.cirX, cirY: this.cirY, cirR: this.cirR, anticlockwise: this.anticlockwise };
    }
}
