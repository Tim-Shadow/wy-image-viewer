import {App, Config, DeepLinker} from "ionic-angular";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {WYImageViewer} from "./wy-image-viewer";
import {Injectable} from "@angular/core";

@Injectable()
export class WYImageViewerController {
    constructor(private _app: App,
                public config: Config,
                private deepLinker: DeepLinker) {
    }

    create(imageElement: any, opts: any = {}) {
        const image = imageElement.src;
        const position = imageElement.getBoundingClientRect();
        const options = {image, position, ...opts};
        return new WYImageViewer(this._app, WYImageViewerComponent, options, this.config, this.deepLinker);
    }
}