import { AfterViewInit, ElementRef, NgZone, Renderer } from "@angular/core";
import { Platform } from "ionic-angular";
export declare class WYSlide implements AfterViewInit {
    private _zone;
    private _plz;
    private _rnd;
    _wrapper: ElementRef;
    zoomed: boolean;
    constructor(_zone: NgZone, _plz: Platform, _rnd: Renderer);
    ngAfterViewInit(): void;
}
