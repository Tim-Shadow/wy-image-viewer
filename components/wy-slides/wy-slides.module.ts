import {NgModule} from "@angular/core";
import {WYSlides} from "./wy-slides";
import {IonicModule} from "ionic-angular";
import {WYSlide} from "./wy-slide";

@NgModule({
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
export class WYSlidesModule {

}