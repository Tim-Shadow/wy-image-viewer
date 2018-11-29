import { AfterViewInit, ElementRef, NgZone, OnDestroy, Renderer } from "@angular/core";
import { Config, DomController, GestureController, Ion, NavController, NavParams, Platform } from "ionic-angular";
import { WYImageViewerCloserGesture } from "./wy-image-viewer-closer.gesture";
import { WYSlides } from "../wy-slides/wy-slides";
export declare class WYImageViewerComponent extends Ion implements OnDestroy, AfterViewInit {
    _gestureCtrl: GestureController;
    elementRef: ElementRef;
    private _nav;
    private _zone;
    private renderer;
    private domCtrl;
    private platform;
    private _navParams;
    dragGesture: WYImageViewerCloserGesture;
    slide: WYSlides;
    private unregisterBackButton;
    private _imageList;
    private _imageSrc;
    private _index;
    constructor(_gestureCtrl: GestureController, elementRef: ElementRef, _nav: NavController, _zone: NgZone, renderer: Renderer, domCtrl: DomController, platform: Platform, _navParams: NavParams, _config: Config);
    close(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
