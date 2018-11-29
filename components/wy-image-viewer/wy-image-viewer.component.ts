import {
    AfterViewInit,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    Renderer, ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {Config, DomController, GestureController, Ion, NavController, NavParams, Platform} from "ionic-angular";
import {WYImageViewerCloserGesture} from "./wy-image-viewer-closer.gesture";
import {WYSlides} from "../wy-slides/wy-slides";

@Component({
    selector: 'wy-image-viewer',
    template: `
        <ion-backdrop class="backdrop"></ion-backdrop>
        <ion-header no-lines no-border>
            <ion-navbar [hideBackButton]="true">
                <ion-buttons end>
                    <button (click)="close()" ion-button clear color="light">关闭</button>
                </ion-buttons>
            </ion-navbar>
        </ion-header>
        <wy-slides [index]="_index">
            <wy-slide *ngFor="let srcUrl of _imageList">
                <img [src]="srcUrl | safeRes"/>
            </wy-slide>
        </wy-slides>
    `,
    encapsulation: ViewEncapsulation.None
})
export class WYImageViewerComponent extends Ion implements OnDestroy, AfterViewInit {
    dragGesture: WYImageViewerCloserGesture;

    @ViewChild(WYSlides) slide: WYSlides;

    private unregisterBackButton: Function;
    private _imageList: string[];
    private _imageSrc: string;
    private _index: number;

    constructor(
        public _gestureCtrl: GestureController,
        public elementRef: ElementRef,
        private _nav: NavController,
        private _zone: NgZone,
        private renderer: Renderer,
        private domCtrl: DomController,
        private platform: Platform,
        private _navParams: NavParams,
        _config: Config) {
        super(_config, elementRef, renderer);

        this._imageList = this._navParams.get("imageList");
        this._imageSrc = this._navParams.get("image");

        this._index = this._imageList.indexOf(this._imageSrc);
        this._index = this._index < 0 ? 0 : this._index;
    }

    close() {
        let callBack = this._navParams.get('onCloseCallback');
        if (typeof callBack === 'function') {
            callBack();
        }
        this._nav.pop();
    }

    ngAfterViewInit(): void {
        const navPop = () => this.close();
        this.unregisterBackButton = this.platform.registerBackButtonAction(navPop);

        this._zone.runOutsideAngular(() => {
            this.dragGesture = new WYImageViewerCloserGesture(this.platform, this, this.domCtrl, this.renderer, navPop);
        });
    }

    ngOnDestroy(): void {
        this.dragGesture && this.dragGesture.destroy();
        this.unregisterBackButton();
    }

}