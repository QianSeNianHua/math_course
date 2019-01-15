/**
 * 数学课堂辅助工具————画板
 */
declare class MyCanvas {
    /**
     * 初始化画板数据
     * @param data 图形数据，继承自Tools
     */
    initData (data: Tools[]): void;
    /**
     * 获取画板数据
     */
    getData (): Tools[];
    /**
     * 监听mousedown事件
     */
    startListen (): void;
    /**
     * 监听mousemove事件
     */
    moveListen (): void;
    /**
     * 监听mouseend事件
     */
    endListen (): void;
    /**
     * 监听click事件
     */
    clickListen (): void;
}

/**
 * 表示工具
 */
interface Tools {
}
