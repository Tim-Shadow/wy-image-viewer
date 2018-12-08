import {
    AfterViewInit,
    Component,
    ElementRef,
    forwardRef, Inject,
    Injector,
    NgZone,
    Optional,
    Renderer,
    ViewChild
} from "@angular/core";
import {WySlideZoomGesture} from "./wy-slide-zoom.gesture";
import {Platform} from "ionic-angular";
import {WYSlides} from "./wy-slides";

@Component({
    template: `
        <div #contain class="wy-slide-item-container">
            <div #wrapper class="wy-slide-item-wrapper">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    selector: 'wy-slide'
})
export class WYSlide implements AfterViewInit {


    @ViewChild('wrapper', {read: ElementRef}) _wrapper: ElementRef;
    @ViewChild('contain', {read: ElementRef}) _container: ElementRef;
    //当前是否缩放
    zoomed: boolean;

    constructor(@Optional()
                @Inject(forwardRef(() => WYSlides)) private container: WYSlides,
                private _zone: NgZone,
                private _plz: Platform, private _rnd: Renderer) {

    }

    ngAfterViewInit(): void {
        if (this.container.zoomAble) {
            this._zone.runOutsideAngular(() => {
                new WySlideZoomGesture(
                    this,
                    this._wrapper,
                    this._plz,
                    this._rnd)
            });
        }
    }
}