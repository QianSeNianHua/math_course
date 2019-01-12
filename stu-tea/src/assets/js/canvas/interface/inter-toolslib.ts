import { ToolsName } from '../enum/enum-configlib';

/**
 * 表示工具
 * @param flag 标志
 * @param x x的坐标
 * @param y y的坐标
 * @param isChoosed true表示图形被选中，false表示未被选中(默认)
 * @param local 由后台录入的图形，则为true；学生端绘的图形，则为false
 */
// tslint:disable-next-line:interface-name
export interface Tools {
    flag: ToolsName;
    x: number;
    y: number;
    isChoosed: boolean;
    lock: boolean;
}

/**
 * 表示点
 */
export interface InterPoint extends Tools { }

/**
 * 表示线段
 * @param r 线段长度
 * @param angle 表示角，单位为弧度
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 */
export interface InterSegment extends Tools {
    r: number;
    angle: number;
    anticlockwise?: boolean;
}

/**
 * 表示圆
 * @param r 半径
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 * @param fillStyle 填充的颜色
 * @param fanAndRadius 存放依赖于圆的扇形和半径
 */
export interface InterCircular extends Tools {
    r: number;
    anticlockwise?: boolean;
    fillStyle: string;
    fanAndRadius: Tools[];
}

/**
 * 表示扇形
 * @param r 半径
 * @param startAngle 表示起始角，单位为弧度
 * @param endAngle 表示结束角，单位为弧度
 * @param fillStyle 填充的颜色
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 * @param hasChord 存放扇形上的弦
 */
export interface InterFan extends Tools {
    r: number;
    startAngle: number;
    endAngle: number;
    fillStyle: string;
    anticlockwise?: boolean;
    hasChord: InterChord;
}

/**
 * 表示半径
 * @param r 半径
 * @param angle 表示角，单位为弧度
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 */
export interface InterRadius extends Tools {
    r: number;
    angle: number;
    anticlockwise?: boolean;
}
/**
 * 表示直径
 * @param r 半径
 * @param angle 表示角，单位为弧度
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 */
export interface InterDiameter extends Tools {
    r: number;
    angle: number;
    anticlockwise?: boolean;
}
/**
 * 表示弦
 * @param endX 表示扇形结束边的x坐标
 * @param endY 表示扇形结束边的y坐标
 * @param isShow 表示弦是否显示
 */
export interface InterChord extends Tools {
    endX: number;
    endY: number;
    isShow: boolean;
}

/**
 * 表示切线
 * @param r 表示切线长度
 * @param angle 表示切线角度
 * @param insePointX 表示切线与圆相交的x坐标
 * @param insePointY 表示相交的y坐标
 * @param cirX 表示依赖的圆的⚪💗的x坐标
 * @param cirY 表示依赖的圆的⚪💗的y坐标
 * @param cirR 表示依赖的圆的半径
 * @param anticlockwise false表示顺时针(默认)，true表示逆时针
 */
export interface InterTangent extends Tools {
    r: number;
    angle: number;
    insePointX: number;
    insePointY: number;
    cirX: number;
    cirY: number;
    cirR: number;
    anticlockwise?: boolean;
}

/**
 * 表示字母标志
 * @param text 文本内容
 */
export interface InterLetterFlag extends Tools {
    text: string;
}

/**
 * 磁性吸附
 * @param x 表示改变后的x坐标
 * @param y 表示改变后的y坐标
 * @param flag true表示已吸附，false表示未吸附
 * @param dist 表示距离
 */
export interface InterAdsorp {
    x: number;
    y: number;
    flag: boolean;
    dist?: number;
}
