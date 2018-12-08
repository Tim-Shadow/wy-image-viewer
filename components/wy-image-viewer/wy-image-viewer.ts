import {OverlayProxy} from "ionic-angular/navigation/overlay-proxy";
import {App, Config, DeepLinker} from "ionic-angular";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {WYImageViewerImpl} from "./wy-image-viewer-impl";
import {Overlay} from "ionic-angular/navigation/overlay";

export class WYImageViewer extends OverlayProxy {

    constructor(app: App, component: typeof WYImageViewerComponent,
                private opts: any = {},
                config: Config,
                deepLinker: DeepLinker) {
        super(app, component, config, deepLinker);
    }

    getImplementation(): Overlay {
        return new WYImageViewerImpl(
            this._app,
            this._component,
            this.opts,
            this._config);
    }
}