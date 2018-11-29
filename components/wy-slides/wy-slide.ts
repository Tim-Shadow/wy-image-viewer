import {AfterViewInit, Component, ElementRef, NgZone, Renderer, ViewChild} from "@angular/core";
import {WySlideZoomGesture} from "./wy-slide-zoom.gesture";
import {Platform} from "ionic-angular";

@Component({
    template: `
        <div class="wy-slide-item-container">
            <div #wrapper class="wy-slide-item-wrapper">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    selector: 'wy-slide'
})
export class WYSlide implements AfterViewInit {


    @ViewChild('wrapper', {read: ElementRef}) _wrapper: ElementRef;

    //当前是否缩放
    zoomed: boolean;

    constructor(private _zone: NgZone, private _plz: Platform, private _rnd: Renderer) {

    }

    ngAfterViewInit(): void {
        this._zone.runOutsideAngular(() => {
            new WySlideZoomGesture(
                this,
                this._wrapper,
                this._plz,
                this._rnd)
        });
    }
}