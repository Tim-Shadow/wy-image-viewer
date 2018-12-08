import { Renderer } from '@angular/core';
import { PanGesture, Platform, DomController } from 'ionic-angular';
import { WYImageViewerComponent } from "./wy-image-viewer.component";
export declare class WYImageViewerCloserGesture extends PanGesture {
    private component;
    private renderer;
    private cb;
    private translationY;
    private opacity;
    private startY;
    private imageContainer;
    private backdrop;
    constructor(platform: Platform, component: WYImageViewerComponent, domCtrl: DomController, renderer: Renderer, cb: Function);
    onDragStart(ev: any): boolean;
    canStart(ev: any): boolean;
    onDragMove(ev: any): boolean;
    onDragEnd(ev: any): boolean;
}
