import { App, Config, DeepLinker } from "ionic-angular";
import { WYImageViewer } from "./wy-image-viewer";
import { DrawerConfigOptions } from "./wy-image-viewer-config";
export declare class WYImageViewerController {
    private _app;
    config: Config;
    private deepLinker;
    constructor(_app: App, config: Config, deepLinker: DeepLinker);
    create(imageElement?: any, opts?: DrawerConfigOptions): WYImageViewer;
}
