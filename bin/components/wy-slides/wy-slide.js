var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, forwardRef, Inject, NgZone, Optional, Renderer, ViewChild } from "@angular/core";
import { WySlideZoomGesture } from "./wy-slide-zoom.gesture";
import { Platform } from "ionic-angular";
import { WYSlides } from "./wy-slides";
var WYSlide = (function () {
    function WYSlide(container, _zone, _plz, _rnd) {
        this.container = container;
        this._zone = _zone;
        this._plz = _plz;
        this._rnd = _rnd;
    }
    WYSlide.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.container.zoomAble) {
            this._zone.runOutsideAngular(function () {
                new WySlideZoomGesture(_this, _this._wrapper, _this._plz, _this._rnd);
            });
        }
    };
    return WYSlide;
}());
__decorate([
    ViewChild('wrapper', { read: ElementRef }),
    __metadata("design:type", ElementRef)
], WYSlide.prototype, "_wrapper", void 0);
__decorate([
    ViewChild('contain', { read: ElementRef }),
    __metadata("design:type", ElementRef)
], WYSlide.prototype, "_container", void 0);
WYSlide = __decorate([
    Component({
        template: "\n        <div #contain class=\"wy-slide-item-container\">\n            <div #wrapper class=\"wy-slide-item-wrapper\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        selector: 'wy-slide'
    }),
    __param(0, Optional()),
    __param(0, Inject(forwardRef(function () { return WYSlides; }))),
    __metadata("design:paramtypes", [WYSlides,
        NgZone,
        Platform, Renderer])
], WYSlide);
export { WYSlide };
