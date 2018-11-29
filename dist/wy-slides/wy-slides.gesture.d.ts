import { PanGesture, Platform } from "ionic-angular";
import { WYSlides } from "./wy-slides";
import { Renderer } from "@angular/core";
import { WYSlidesManage } from "./wy-slides.manage";
export declare class WYSlidesGesture extends PanGesture {
    private manage;
    private component;
    renderer: Renderer;
    ele: HTMLElement;
    startX: number;
    translateX: number;
    timeStart: number;
    constructor(plt: Platform, manage: WYSlidesManage, component: WYSlides);
    canStart(): boolean;
    onDragStart(ev: any): void;
    onDragMove(ev: any): void;
    onDragEnd(ev: any): void;
    destroy(): void;
}
