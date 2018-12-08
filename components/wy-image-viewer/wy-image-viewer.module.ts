import {WYImageViewerDirective} from "./wy-image-viewer.directive";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {WYImageViewerController} from "./wy-image-viewer.controller";
import {IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {WyPipesModule} from "../../pipes/wy-pipes.module";
import {WYSlidesModule} from "../wy-slides/wy-slides.module";

@NgModule({
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
export class WYImageViewerModule {

}