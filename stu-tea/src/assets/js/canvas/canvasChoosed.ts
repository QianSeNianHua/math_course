import { ToolsName, Attribute } from './enum/enum-configlib';
import { Tools, InterPoint, InterSegment, InterCircular, InterRadius, InterFan, InterLetterFlag, InterChord, InterTangent } from './interface/inter-toolslib';
import { CanvasData } from './canvasData';

/**
 * 判断图形是否被选中
 */
export class CanvasChoosed {
    private x: number;  // 鼠标的x坐标
    private y: number;  // 鼠标的y坐标
    private offset: number;  // 偏移量
    private index: number[];  // 记录被选中图形的下标 (点、线段、圆(扇形(弦)、半径)) [(点、线段、圆), (扇形、半径), (弦)]
    private isMobild: boolean;  // true表示开始点击，false表示结束点击
    private canvasData: CanvasData;  // canvas图形数据
    private myCanvasNode: HTMLElement;  // canvas节点

    constructor (isMobild: boolean, canvasData: CanvasData, myCanvasNode: HTMLElement) {
        this.offset = 20;
        this.index = [];
        this.isMobild = isMobild;
        this.canvasData = canvasData;
        this.myCanvasNode = myCanvasNode;
    }

    /**
     * canvas的click事件
     * @param e Event事件
     * @returns void
     */
    canvasClick (e: Event): void {
        if (this.isMobild) {
            // 移动端
            // let event: TouchEvent = (e as CustomEvent).detail.gesture;  // 需要导入MUI框架

            // this.x = event.changedTouches[0].clientX - this.myCanvasNode.getBoundingClientRect().left;
            // this.y = event.changedTouches[0].clientY - this.myCanvasNode.getBoundingClientRect().top;

            let event: MouseEvent = (e as MouseEvent);

            this.x = event.clientX - this.myCanvasNode.getBoundingClientRect().left;
            this.y = event.clientY - this.myCanvasNode.getBoundingClientRect().top;
        } else {
            // PC端
            let event: MouseEvent = (e as MouseEvent);

            this.x = event.clientX - this.myCanvasNode.getBoundingClientRect().left;
            this.y = event.clientY - this.myCanvasNode.getBoundingClientRect().top;
        }

        this.isChoosed.call(this);
    }

    /**
     * 判断图形是否被选中
     * @returns void
     */
    private isChoosed (): void {
        let choosedIndex: number[][] = [];  // 存储所有被选中图形的下标，[[0], [0, 0], [0, 0, -1]]
        this.index = [];  // 表示当前被选中图形的下标
        let data = this.canvasData.getData() as Tools[];  // 表示所有图形

        // 遍历所有图形，判断出符合选中的图形
        // 最后画的最先遍历
        for (let i = data.length - 1; i >= 0; i--) {
            let v = data[i];
            switch (v.flag) {
            case ToolsName.point:
                if (this.cirPoint(v)) {
                    choosedIndex.push([i]);
                } else {
                    v.isChoosed = false;
                }
                break;
            case ToolsName.segment:
                if (this.cirSegment(v)) {
                    choosedIndex.push([i]);
                } else {
                    v.isChoosed = false;
                }
                break;
            case ToolsName.circular:
                let cirTool = (v as InterCircular).fanAndRadius;
                for (let j = cirTool.length - 1; j >= 0; j--) {
                    let v2 = cirTool[j];
                    switch (v2.flag) {
                    case ToolsName.fan:
                        let v3 = (v2 as InterFan).hasChord;
                        if (v3.isShow) {
                            // 弦
                            if (this.cirChord(v3)) {
                                choosedIndex.push([i, j, -1]);
                            } else {
                                v3.isChoosed = false;
                            }
                        }

                        // 扇形
                        if (this.cirFan(v2)) {
                            choosedIndex.push([i, j]);
                        } else {
                            v2.isChoosed = false;
                        }
                        break;
                    case ToolsName.radius:
                        if (this.cirRadius(v2)) {
                            choosedIndex.push([i, j]);
                        } else {
                            v2.isChoosed = false;
                        }
                        break;
                    case ToolsName.diameter:
                        if (this.cirDiameter(v2)) {
                            choosedIndex.push([i, j]);
                        } else {
                            v2.isChoosed = false;
                        }
                        break;
                    case ToolsName.tangent:
                        if (this.cirTangent(v2)) {
                            choosedIndex.push([i, j]);
                        } else {
                            v2.isChoosed = false;
                        }
                        break;
                    default: break;
                    }
                }

                // 圆
                if (this.cirCircular(v)) {
                    choosedIndex.push([i]);
                } else {
                    v.isChoosed = false;
                }
                break;
            case ToolsName.letterFlag:
                if (this.cirLetterFlag(v)) {
                    choosedIndex.push([i]);
                } else {
                    v.isChoosed = false;
                }
                break;
            default: break;
            }
        }

        // 获取多个符合选中图形的choosedIndex中当前选中的下一个图形
        for (let i = 0, count = 0, flag = false; ;i++) {
            if (choosedIndex.length === 0) {
                break;
            }

            // 为了一直循环遍历，从而找到被选中的图形，才能获取下一个图形
            if (i > choosedIndex.length - 1) {
                i = 0;
                count++;
            }

            let v = choosedIndex[i];

            if (count === 0) {
                // 遍历第一次
                if (flag) {
                    // 直接获取当前图形
                    this.indLen(v, data).isChoosed = true;
                    this.index = v;

                    break;
                } else {
                    // 判断图形，如果被选中，则flag=true，并获取下一个图形；如果未被选中，则继续判断下一个图形
                    if (this.indLen(v, data).isChoosed) {
                        flag = true;
                        this.indLen(v, data).isChoosed = false;

                        continue;
                    }
                }
            } else if (count > 0) {
                // 遍历第二次，直接获取当前图形
                this.indLen(v, data).isChoosed = true;
                this.index = v;

                break;
            }
        }
    }

    /**
     * 返回当前图形的对象
     * @param v
     * @param data
     * @param true 有图形被选中； false 没有图形被选中
     */
    private indLen (v: number[], data: Tools[]): Tools {
        if (v.length === 1) {
            return data[v[0]];
        } else if (v.length === 2) {
            return (data[v[0]] as InterCircular).fanAndRadius[v[1]];
        } else if (v.length === 3) {
            return ((data[v[0]] as InterCircular).fanAndRadius[v[1]] as InterFan).hasChord;
        }
    }

    /**
     * 获取被选中图形的下标
     * @returns Array<number>
     */
    getIndex (): number[] {
        return this.index;
    }

    /**
     * 清除被选图形的下标
     * @returns void
     */
    recoverIndex (): void {
        this.index = [];
    }

    /**
     * 取消图形选中
     */
    cancleSelected (): void {
        if (this.index.length === 1) {
            // 清除点、线段、圆
            (this.canvasData.getData(this.index[0]) as Tools).isChoosed = false;
        } else if (this.index.length === 2) {
            // 清除扇形、半径、直径、切线
            (this.canvasData.getData(this.index[0]) as InterCircular).fanAndRadius[this.index[1]].isChoosed = false;
        } else if (this.index.length === 3) {
            // 清除弦
            ((this.canvasData.getData(this.index[0]) as InterCircular).fanAndRadius[this.index[1]] as InterFan).hasChord.isChoosed = false;
        }
    }

    /**
     * 计算点
     * @param tool Tools
     */
    private cirPoint (tool: Tools): boolean {
        let data = tool as InterPoint;
        let range = Math.sqrt(Math.pow((this.y - data.y), 2) + Math.pow((this.x - data.x), 2));
        if (range <= Attribute.adsorpChoosed) return true;
        else return false;
    }

    /**
     * 计算线段
     * @param tool Tools
     */
    private cirSegment (tool: Tools): boolean {
        let data = tool as InterSegment;

        // 设线段起点为O(data.x, data.y)，鼠标点位置为P(this.x, this.y)，P点到线段OB的最短距离投影到线段上的点为Q
        // pr表示P到线段起点的距离
        // pangle表示pr绕x坐标顺时针旋转的角度
        // dist表示P到线段的最短距离，投影到线段上标记为Q点
        // or表示线段起点到Q点的距离
        let pr = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        let pangle = Math.atan2((this.y - data.y), (this.x - data.x));
        pangle = (pangle >= 0) ? pangle : (2 * Math.PI + pangle);
        let dist = Math.abs(Math.sin(Math.abs(data.angle - pangle)) * pr);
        let or = Math.cos(Math.abs(data.angle - pangle)) * pr;

        if (dist <= Attribute.adsorpChoosed && or >= -Attribute.adsorpChoosed && or <= (data.r + Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 计算圆
     * @param tool Tools
     */
    private cirCircular (tool: Tools): boolean {
        let data = tool as InterCircular;
        let radius = Math.sqrt(Math.pow((this.y - data.y), 2) + Math.pow((this.x - data.x), 2));
        if (radius <= data.r) return true;
        else return false;
    }

    /**
     * 计算扇形
     * @param tool Tools
     */
    private cirFan (tool: Tools): boolean {
        let data = tool as InterFan;

        // 计算鼠标点到圆点的距离
        let r = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        if (r > data.r) {
            return false;
        }

        // 计算鼠标点的圆心角是不是在扇形圆心角范围内
        let angle = Math.atan2((this.y - data.y), (this.x - data.x));
        angle = (angle >= 0) ? angle : (2 * Math.PI + angle);
        if (data.startAngle <= data.endAngle) {
            if (angle < data.startAngle || angle > data.endAngle) return false;
        } else {
            if (angle > data.endAngle && angle < data.startAngle) return false;
        }

        return true;
    }

    /**
     * 计算半径
     * @param tool Tools
     */
    private cirRadius (tool: Tools): boolean {
        let data = tool as InterRadius;

        // 设线段起点为O(data.x, data.y)，鼠标点位置为P(this.x, this.y)，P点到线段OB的最短距离投影到线段上的点为Q
        // pr表示P到线段起点的距离
        // pangle表示pr绕x坐标顺时针旋转的角度
        // dist表示P到线段的最短距离，投影到线段上标记为Q点
        // or表示线段起点到Q点的距离
        let pr = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        let pangle = Math.atan2((this.y - data.y), (this.x - data.x));
        pangle = (pangle >= 0) ? pangle : (2 * Math.PI + pangle);
        let dist = Math.abs(Math.sin(Math.abs(data.angle - pangle)) * pr);
        let or = Math.cos(Math.abs(data.angle - pangle)) * pr;

        if (dist <= Attribute.adsorpChoosed && or >= -Attribute.adsorpChoosed && or <= (data.r + Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 计算直径
     * @param tool Tools
     */
    private cirDiameter (tool: Tools): boolean {
        let data = tool as InterRadius;

        // 设线段起点为O(data.x, data.y)，鼠标点位置为P(this.x, this.y)，P点到线段OB的最短距离投影到线段上的点为Q
        // pr表示P到线段起点的距离
        // pangle表示pr绕x坐标顺时针旋转的角度
        // dist表示P到线段的最短距离，投影到线段上标记为Q点
        // or表示线段起点到Q点的距离
        let pr = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        let pangle = Math.atan2((this.y - data.y), (this.x - data.x));
        pangle = (pangle >= 0) ? pangle : (2 * Math.PI + pangle);
        let dist1 = Math.abs(Math.sin(Math.abs(data.angle - pangle)) * pr);
        let or1 = Math.cos(Math.abs(data.angle - pangle)) * pr;
        let dist2 = Math.abs(Math.sin(Math.abs(data.angle + Math.PI - pangle)) * pr);
        let or2 = Math.cos(Math.abs(data.angle + Math.PI - pangle)) * pr;

        if (dist1 <= Attribute.adsorpChoosed && or1 >= -Attribute.adsorpChoosed && or1 <= (data.r + Attribute.adsorpChoosed)) {
            return true;
        } else if (dist2 <= Attribute.adsorpChoosed && or2 >= -Attribute.adsorpChoosed && or2 <= (data.r + Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 计算弦
     * @param tool Tools
     */
    private cirChord (tool: Tools): boolean {
        let data = tool as InterChord;

        if (!data.isShow) {
            return false;
        }

        // 设线段起点为O(data.x, data.y)，鼠标点位置为P(this.x, this.y)，P点到线段OB的最短距离投影到线段上的点为Q
        // angle表示线段到x坐标顺时针的角度
        // r表示线段的长度
        // pr表示P到线段起点的距离
        // pangle表示pr绕x坐标顺时针旋转的角度
        // dist表示P到线段的最短距离，投影到线段上标记为Q点
        // or表示线段起点到Q点的距离
        let angle = Math.atan2((data.endY - data.y), (data.endX - data.x));
        angle = (angle >= 0) ? angle : (2 * Math.PI + angle);
        let r = Math.sqrt(Math.pow((data.endX - data.x), 2) + Math.pow((data.endY - data.y), 2));
        let pr = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        let pangle = Math.atan2((this.y - data.y), (this.x - data.x));
        pangle = (pangle >= 0) ? pangle : (2 * Math.PI + pangle);
        let dist = Math.abs(Math.sin(Math.abs(angle - pangle)) * pr);
        let or = Math.cos(Math.abs(angle - pangle)) * pr;

        if (dist <= Attribute.adsorpChoosed && or >= -Attribute.adsorpChoosed && or <= (r + Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 计算切线
     * @param tool
     */
    private cirTangent (tool: Tools): boolean {
        let data = tool as InterTangent;

        // 设线段起点为O(data.x, data.y)，鼠标点位置为P(this.x, this.y)，P点到线段OB的最短距离投影到线段上的点为Q
        // pr表示P到线段起点的距离
        // pangle表示pr绕x坐标顺时针旋转的角度
        // dist表示P到线段的最短距离，投影到线段上标记为Q点
        // or表示线段起点到Q点的距离
        let pr = Math.sqrt(Math.pow((this.x - data.x), 2) + Math.pow((this.y - data.y), 2));
        let pangle = Math.atan2((this.y - data.y), (this.x - data.x));
        pangle = (pangle >= 0) ? pangle : (2 * Math.PI + pangle);
        let dist = Math.abs(Math.sin(Math.abs(data.angle - pangle)) * pr);
        let or = Math.cos(Math.abs(data.angle - pangle)) * pr;

        if (dist <= Attribute.adsorpChoosed && or >= -Attribute.adsorpChoosed && or <= (data.r + Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 计算文本标志
     */
    private cirLetterFlag (tool: Tools): boolean {
        let data = tool as InterLetterFlag;

        if (this.x >= (data.x - Attribute.adsorpChoosed) && this.x <= (data.x + (Attribute.adsorpChoosed + (Attribute.adsorpChoosed / 2))) && this.y >= (data.y - (Attribute.adsorpChoosed - (Attribute.adsorpChoosed / 2))) && this.y <= (data.y + 2 * Attribute.adsorpChoosed)) {
            return true;
        } else {
            return false;
        }
    }
}
