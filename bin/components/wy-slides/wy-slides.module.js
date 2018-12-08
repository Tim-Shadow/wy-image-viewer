var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { WYSlides } from "./wy-slides";
import { IonicModule } from "ionic-angular";
import { WYSlide } from "./wy-slide";
var WYSlidesModule = (function () {
    function WYSlidesModule() {
    }
    return WYSlidesModule;
}());
WYSlidesModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
        ],
        declarations: [
            WYSlide,
            WYSlides,
        ],
        exports: [
            WYSlide,
            WYSlides,
        ],
        providers: []
    })
], WYSlidesModule);
export { WYSlidesModule };
