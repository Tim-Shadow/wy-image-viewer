import { Renderer } from "@angular/core";
export declare class WYSlidesOptions {
    padding?: number;
}
export declare class WYSlidesManage {
    private index;
    private _ele;
    private renderer;
    private _config;
    translateX: number;
    private readonly _padding;
    private _count;
    private _containerWidth;
    private _pageIndex;
    private _loop;
    constructor(index: number, _ele: HTMLElement, renderer: Renderer, _config?: WYSlidesOptions);
    private _init();
    dragEnd(translateX: any): void;
    getNextTranslateX(index: any): number;
    getNextPage(): number;
    getPrePage(): number;
    recover(): number;
    getIndex(): number;
}
