import { AfterViewInit, ElementRef, NgZone, Renderer } from "@angular/core";
import { Platform } from "ionic-angular";
import { WYSlides } from "./wy-slides";
export declare class WYSlide implements AfterViewInit {
    private container;
    private _zone;
    private _plz;
    private _rnd;
    _wrapper: ElementRef;
    _container: ElementRef;
    zoomed: boolean;
    constructor(container: WYSlides, _zone: NgZone, _plz: Platform, _rnd: Renderer);
    ngAfterViewInit(): void;
}
