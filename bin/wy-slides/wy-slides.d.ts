import { AfterViewInit, ElementRef, NgZone, OnDestroy, QueryList, Renderer } from "@angular/core";
import { Config, DomController, GestureController, Ion, Platform } from "ionic-angular";
import { WYSlidesGesture } from "./wy-slides.gesture";
import { WYSlidesManage } from "./wy-slides.manage";
import { WYSlide } from "./wy-slide";
export declare class WYSlides extends Ion implements AfterViewInit, OnDestroy {
    private _plt;
    _gestureCtrl: GestureController;
    _domCtrl: DomController;
    private _zone;
    private elementRef;
    private renderer;
    index: number;
    slides: QueryList<WYSlide>;
    panGesture: WYSlidesGesture;
    slidesManage: WYSlidesManage;
    readonly zoomed: boolean;
    getActiveSlide(): WYSlide;
    constructor(_config: Config, _plt: Platform, _gestureCtrl: GestureController, _domCtrl: DomController, _zone: NgZone, elementRef: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
