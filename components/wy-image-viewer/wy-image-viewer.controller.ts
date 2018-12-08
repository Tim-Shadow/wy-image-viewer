import {App, Config, DeepLinker} from "ionic-angular";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {WYImageViewer} from "./wy-image-viewer";
import {Injectable} from "@angular/core";
import {DrawerConfigOptions} from "./wy-image-viewer-config";

@Injectable()
export class WYImageViewerController {
    constructor(private _app: App,
                public config: Config,
                private deepLinker: DeepLinker) {
    }

    create(imageElement?: any, opts: DrawerConfigOptions = {imageList: []}) {
        const image = opts.image || (imageElement && imageElement.src);
        const position = opts.position || (imageElement && imageElement.getBoundingClientRect());
        const onCloseCallback = () => {
            console.log('关闭了')
        };
        const options = {onCloseCallback, image, position, ...opts};
        return new WYImageViewer(this._app, WYImageViewerComponent, options, this.config, this.deepLinker);
    }
}