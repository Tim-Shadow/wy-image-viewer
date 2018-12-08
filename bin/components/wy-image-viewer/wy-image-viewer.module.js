var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WYImageViewerDirective } from "./wy-image-viewer.directive";
import { WYImageViewerComponent } from "./wy-image-viewer.component";
import { WYImageViewerController } from "./wy-image-viewer.controller";
import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { WyPipesModule } from "../../pipes/wy-pipes.module";
import { WYSlidesModule } from "../wy-slides/wy-slides.module";
var WYImageViewerModule = (function () {
    function WYImageViewerModule() {
    }
    return WYImageViewerModule;
}());
WYImageViewerModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            WYSlidesModule,
            WyPipesModule
        ],
        declarations: [
            WYImageViewerComponent,
            WYImageViewerDirective,
        ],
        entryComponents: [
            WYImageViewerComponent,
        ],
        providers: [
            WYImageViewerController
        ],
        exports: [
            WYImageViewerDirective,
        ]
    })
], WYImageViewerModule);
export { WYImageViewerModule };
