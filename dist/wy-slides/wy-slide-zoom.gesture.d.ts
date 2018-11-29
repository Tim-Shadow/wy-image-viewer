import { Gesture, Platform } from "ionic-angular";
import { Renderer } from "@angular/core";
import { WYSlide } from "./wy-slide";
export declare class WySlideZoomGesture extends Gesture {
    private component;
    private platform;
    private renderer;
    private adjustScale;
    private adjustDeltaX;
    private adjustDeltaY;
    private currentScale;
    private currentDeltaX;
    private currentDeltaY;
    private allowedXMargin;
    private allowedYMargin;
    on(type: any, cb: Function): void;
    constructor(component: WYSlide, element: any, platform: Platform, renderer: Renderer);
    onPinch(event: any): void;
    onPinchEnd(event: any): void;
    onPanStart(event: any): void;
    onPan(event: any): void;
    onPanEnd(ev: any): void;
    onDoubleTap(ev: any): void;
    setImageContainerTransform(): void;
}
