import { OverlayProxy } from "ionic-angular/navigation/overlay-proxy";
import { App, Config, DeepLinker } from "ionic-angular";
import { WYImageViewerComponent } from "./wy-image-viewer.component";
import { Overlay } from "ionic-angular/navigation/overlay";
export declare class WYImageViewer extends OverlayProxy {
    private opts;
    constructor(app: App, component: typeof WYImageViewerComponent, opts: any, config: Config, deepLinker: DeepLinker);
    getImplementation(): Overlay;
}
