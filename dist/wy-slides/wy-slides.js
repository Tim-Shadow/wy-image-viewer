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
import { Component, ContentChildren, ElementRef, Input, NgZone, QueryList, Renderer } from "@angular/core";
import { Config, DomController, GestureController, Ion, Platform } from "ionic-angular";
import { WYSlidesGesture } from "./wy-slides.gesture";
import { WYSlidesManage } from "./wy-slides.manage";
import { WYSlide } from "./wy-slide";
var WYSlides = (function (_super) {
    __extends(WYSlides, _super);
    function WYSlides(_config, _plt, _gestureCtrl, _domCtrl, _zone, elementRef, renderer) {
        var _this = _super.call(this, _config, elementRef, renderer) || this;
        _this._plt = _plt;
        _this._gestureCtrl = _gestureCtrl;
        _this._domCtrl = _domCtrl;
        _this._zone = _zone;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(WYSlides.prototype, "zoomed", {
        get: function () {
            for (var _i = 0, _a = this.slides.toArray(); _i < _a.length; _i++) {
                var slide = _a[_i];
                if (slide.zoomed) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    WYSlides.prototype.getActiveSlide = function () {
        return this.slides.toArray()[this.slidesManage.getIndex()];
    };
    WYSlides.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.slidesManage = new WYSlidesManage(this.index, this.elementRef.nativeElement, this.renderer, { padding: 20 });
        this._zone.runOutsideAngular(function () {
            _this.panGesture = new WYSlidesGesture(_this._plt, _this.slidesManage, _this);
            console.log('xxx');
        });
    };
    WYSlides.prototype.ngOnDestroy = function () {
        this.panGesture.destroy();
    };
    return WYSlides;
}(Ion));
__decorate([
    Input(),
    __metadata("design:type", Number)
], WYSlides.prototype, "index", void 0);
__decorate([
    ContentChildren(WYSlide),
    __metadata("design:type", QueryList)
], WYSlides.prototype, "slides", void 0);
WYSlides = __decorate([
    Component({
        selector: 'wy-slides',
        template: "\n        <div class=\"wy-slide-control-container\">\n            <ng-content></ng-content>\n        </div>",
    }),
    __metadata("design:paramtypes", [Config,
        Platform,
        GestureController,
        DomController,
        NgZone,
        ElementRef, Renderer])
], WYSlides);
export { WYSlides };
//# sourceMappingURL=wy-slides.js.map