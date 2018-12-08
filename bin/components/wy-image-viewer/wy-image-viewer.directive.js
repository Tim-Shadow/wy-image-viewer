var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { WYImageViewerController } from "./wy-image-viewer.controller";
var WYImageViewerDirective = (function () {
    function WYImageViewerDirective(_el, imageViewerCtrl) {
        this._el = _el;
        this.imageViewerCtrl = imageViewerCtrl;
        this.close = new EventEmitter();
    }
    WYImageViewerDirective.prototype.onClick = function (event) {
        var _this = this;
        event.stopPropagation();
        var element = this._el.nativeElement;
        var onCloseCallback = function () { return _this.close.emit(); };
        var imageViewer = this.imageViewerCtrl.create(element, { imageList: this.imageList, onCloseCallback: onCloseCallback });
        imageViewer.present();
    };
    return WYImageViewerDirective;
}());
__decorate([
    Input('wyImageViewer'),
    __metadata("design:type", Array)
], WYImageViewerDirective.prototype, "imageList", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WYImageViewerDirective.prototype, "close", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], WYImageViewerDirective.prototype, "onClick", null);
WYImageViewerDirective = __decorate([
    Directive({
        selector: 'img[wyImageViewer]'
    }),
    __metadata("design:paramtypes", [ElementRef,
        WYImageViewerController])
], WYImageViewerDirective);
export { WYImageViewerDirective };
