import {NgModule} from "@angular/core";
import {WYSlide} from "./wy-slides/wy-slide";
import {WYSlides} from "./wy-slides/wy-slides";
import {IonicModule} from "ionic-angular";
import {WYImageViewerDirective} from "./wy-image-viewer/wy-image-viewer.directive";
import {WYImageViewerController} from "./wy-image-viewer/wy-image-viewer.controller";
import {WYImageViewerComponent} from "./wy-image-viewer/wy-image-viewer.component";
import {SafeResPipe} from "./safe-res";

@NgModule({
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
export class WYComponentsModule {

}