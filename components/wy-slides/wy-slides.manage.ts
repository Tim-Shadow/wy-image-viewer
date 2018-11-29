import {Renderer} from "@angular/core";

export class WYSlidesOptions {
    padding?: number
}

export class WYSlidesManage {
    translateX: number;
    private readonly _padding: number;          //页面与页面之间的距离
    private _count: number;                     //页面个数
    private _containerWidth: number;            //容器宽度
    private _pageIndex: number = 0;             //当前页面索引，以0开始
    //TODO 将来需要实现能循环的情况
    private _loop: boolean = false;              //默认为false


    constructor(
        private index: number,
        private _ele: HTMLElement,
        private renderer: Renderer,
        private _config?: WYSlidesOptions) {
        this._config = _config || {};
        this._padding = this._config.padding || 0;
        this._init();
        this._pageIndex = this.index;
    }

    private _init() {
        let childrenSlide = this._ele.querySelectorAll(".wy-slide-item-container");
        let container = this._ele.querySelector('.wy-slide-control-container');
        this._containerWidth = container.getBoundingClientRect().width;
        this._count = childrenSlide.length;
        for (let i = 0; i < childrenSlide.length; i++) {
            this.renderer.setElementStyle(childrenSlide[i], 'width', `${this._containerWidth}px`);
            this.renderer.setElementStyle(childrenSlide[i], 'margin-right', `${this._padding}px`);
        }
    }

    dragEnd(translateX) {

    }

    getNextTranslateX(index) {
        return -index * (this._containerWidth + this._padding);
    }

    getNextPage() {
        //索引+1
        this._pageIndex++;
        if (!this._loop) {
            if (this._pageIndex >= this._count)
                this._pageIndex = this._count - 1;
        } else {
            //TODO 需要实现_loop为true的情况
        }
        return this.getNextTranslateX(this._pageIndex)
    }

    getPrePage() {
        this._pageIndex--;
        if (!this._loop) {
            if (this._pageIndex < 0) {
                this._pageIndex = 0;
            }
        } else {
            //TODO 需要实现_loop为true的情况
        }
        return this.getNextTranslateX(this._pageIndex)
    }

    recover() {
        return this.getNextTranslateX(this._pageIndex);
    }

    getIndex() {
        return this._pageIndex;
    }
}