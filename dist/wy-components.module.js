var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { WYSlide } from "./wy-slides/wy-slide";
import { WYSlides } from "./wy-slides/wy-slides";
import { IonicModule } from "ionic-angular";
import { WYImageViewerDirective } from "./wy-image-viewer/wy-image-viewer.directive";
import { WYImageViewerController } from "./wy-image-viewer/wy-image-viewer.controller";
import { WYImageViewerComponent } from "./wy-image-viewer/wy-image-viewer.component";
import { SafeResPipe } from "./safe-res";
var WYComponentsModule = (function () {
    function WYComponentsModule() {
    }
    return WYComponentsModule;
}());
WYComponentsModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
        ],
        declarations: [
            WYSlide,
            WYSlides,
            SafeResPipe,
            WYImageViewerComponent,
            WYImageViewerDirective
        ],
        entryComponents: [
            WYImageViewerComponent,
        ],
        providers: [
            WYImageViewerController
        ],
        exports: [
            SafeResPipe,
            WYImageViewerDirective,
        ]
    })
], WYComponentsModule);
export { WYComponentsModule };
//# sourceMappingURL=wy-components.module.js.map