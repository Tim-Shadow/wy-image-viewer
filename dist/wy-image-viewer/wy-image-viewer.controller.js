var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { App, Config, DeepLinker } from "ionic-angular";
import { WYImageViewerComponent } from "./wy-image-viewer.component";
import { WYImageViewer } from "./wy-image-viewer";
import { Injectable } from "@angular/core";
var WYImageViewerController = (function () {
    function WYImageViewerController(_app, config, deepLinker) {
        this._app = _app;
        this.config = config;
        this.deepLinker = deepLinker;
    }
    WYImageViewerController.prototype.create = function (imageElement, opts) {
        if (opts === void 0) { opts = {}; }
        var image = imageElement.src;
        var position = imageElement.getBoundingClientRect();
        var options = __assign({ image: image, position: position }, opts);
        return new WYImageViewer(this._app, WYImageViewerComponent, options, this.config, this.deepLinker);
    };
    return WYImageViewerController;
}());
WYImageViewerController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [App,
        Config,
        DeepLinker])
], WYImageViewerController);
export { WYImageViewerController };
