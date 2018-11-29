import {
    AfterViewInit,
    Component,
    ContentChild, ContentChildren,
    ElementRef, Input,
    NgZone,
    OnDestroy, QueryList,
    Renderer,
    ViewChildren
} from "@angular/core";
import {Config, DomController, GestureController, Ion, Platform} from "ionic-angular";
import {WYSlidesGesture} from "./wy-slides.gesture";
import {WYSlidesManage} from "./wy-slides.manage";
import {WYSlide} from "./wy-slide";

@Component({
    selector: 'wy-slides',
    template: `
        <div class="wy-slide-control-container">
            <ng-content></ng-content>
        </div>`,
})
export class WYSlides extends Ion implements AfterViewInit, OnDestroy {


    @Input() index: number = 0;

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
            {padding: 20});
        this._zone.runOutsideAngular(() => {
            this.panGesture = new WYSlidesGesture(this._plt, this.slidesManage, this);
            console.log('xxx')
        })
    }

    ngOnDestroy(): void {
        this.panGesture.destroy();
    }

}