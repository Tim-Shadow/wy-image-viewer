import {
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef, forwardRef, Input,
    NgZone,
    OnDestroy, QueryList,
    Renderer,
} from "@angular/core";
import {Config, DomController, GestureController, Ion, Platform, RootNode} from "ionic-angular";
import {WYSlidesGesture} from "./wy-slides.gesture";
import {WYSlidesManage} from "./wy-slides.manage";
import {WYSlide} from "./wy-slide";

@Component({
    selector: 'wy-slides',
    template: `
        <div class="wy-slide-control-container">
            <ng-content></ng-content>
        </div>`
})

export class WYSlides extends Ion implements AfterViewInit, OnDestroy {

    //是否允许缩放
    private _zoom: boolean = false;
    private _padding: number;

    @Input() index: number = 0;

    @Input() set padding(padding: number) {
        this._padding = padding ? ~~padding : 0;
    };

    @ContentChildren(WYSlide) slides: QueryList<WYSlide>;
    panGesture: WYSlidesGesture;
    slidesManage: WYSlidesManage;


    get zoomed() {
        for (let slide of this.slides.toArray()) {
            if (slide.zoomed) {
                return true;
            }
        }
        return false;
    }

    //是否允许缩放
    @Input("zoom-able")
    set zoomAble(zoom) {
        this._zoom = zoom;
    }

    get zoomAble() {
        return this._zoom;
    }

    getActiveSlide() {
        return this.slides.toArray()[this.slidesManage.getIndex()];
    }

    constructor(_config: Config,
                private _plt: Platform,
                public _gestureCtrl: GestureController,
                public _domCtrl: DomController,
                private _zone: NgZone,
                private elementRef: ElementRef, private renderer: Renderer) {
        super(_config, elementRef, renderer)
    }

    ngAfterViewInit(): void {
        this.slidesManage = new WYSlidesManage(
            this.index,
            this.elementRef.nativeElement,
            this.renderer,
            {padding: this._padding});

        this._initZoom();
    }

    _initZoom() {
        this._zone.runOutsideAngular(() => {
            this.panGesture = new WYSlidesGesture(this._plt, this.slidesManage, this);
        })
    }

    _destroyZoom() {
        this.panGesture && this.panGesture.destroy();
        this.panGesture = null;
    }

    ngOnDestroy(): void {
        this._destroyZoom();
    }

}