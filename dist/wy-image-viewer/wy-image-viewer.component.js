var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, NgZone, Renderer, ViewChild, ViewEncapsulation } from "@angular/core";
import { Config, DomController, GestureController, Ion, NavController, NavParams, Platform } from "ionic-angular";
import { WYImageViewerCloserGesture } from "./wy-image-viewer-closer.gesture";
import { WYSlides } from "../wy-slides/wy-slides";
var WYImageViewerComponent = (function (_super) {
    __extends(WYImageViewerComponent, _super);
    function WYImageViewerComponent(_gestureCtrl, elementRef, _nav, _zone, renderer, domCtrl, platform, _navParams, _config) {
        var _this = _super.call(this, _config, elementRef, renderer) || this;
        _this._gestureCtrl = _gestureCtrl;
        _this.elementRef = elementRef;
        _this._nav = _nav;
        _this._zone = _zone;
        _this.renderer = renderer;
        _this.domCtrl = domCtrl;
        _this.platform = platform;
        _this._navParams = _navParams;
        _this._imageList = _this._navParams.get("imageList");
        _this._imageSrc = _this._navParams.get("image");
        _this._index = _this._imageList.indexOf(_this._imageSrc);
        _this._index = _this._index < 0 ? 0 : _this._index;
        return _this;
    }
    WYImageViewerComponent.prototype.close = function () {
        var callBack = this._navParams.get('onCloseCallback');
        if (typeof callBack === 'function') {
            callBack();
        }
        this._nav.pop();
    };
    WYImageViewerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var navPop = function () { return _this.close(); };
        this.unregisterBackButton = this.platform.registerBackButtonAction(navPop);
        this._zone.runOutsideAngular(function () {
            _this.dragGesture = new WYImageViewerCloserGesture(_this.platform, _this, _this.domCtrl, _this.renderer, navPop);
        });
    };
    WYImageViewerComponent.prototype.ngOnDestroy = function () {
        this.dragGesture && this.dragGesture.destroy();
        this.unregisterBackButton();
    };
    return WYImageViewerComponent;
}(Ion));
__decorate([
    ViewChild(WYSlides),
    __metadata("design:type", WYSlides)
], WYImageViewerComponent.prototype, "slide", void 0);
WYImageViewerComponent = __decorate([
    Component({
        selector: 'wy-image-viewer',
        template: "\n        <ion-backdrop class=\"backdrop\"></ion-backdrop>\n        <ion-header no-lines no-border>\n            <ion-navbar [hideBackButton]=\"true\">\n                <ion-buttons end>\n                    <button (click)=\"close()\" ion-button clear color=\"light\">\u5173\u95ED</button>\n                </ion-buttons>\n            </ion-navbar>\n        </ion-header>\n        <wy-slides [index]=\"_index\">\n            <wy-slide *ngFor=\"let srcUrl of _imageList\">\n                <img [src]=\"srcUrl | safeRes\"/>\n            </wy-slide>\n        </wy-slides>\n    ",
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [GestureController,
        ElementRef,
        NavController,
        NgZone,
        Renderer,
        DomController,
        Platform,
        NavParams,
        Config])
], WYImageViewerComponent);
export { WYImageViewerComponent };
//# sourceMappingURL=wy-image-viewer.component.js.map