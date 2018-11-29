import { App, Config, DeepLinker } from "ionic-angular";
import { WYImageViewer } from "./wy-image-viewer";
export declare class WYImageViewerController {
    private _app;
    config: Config;
    private deepLinker;
    constructor(_app: App, config: Config, deepLinker: DeepLinker);
    create(imageElement: any, opts?: any): WYImageViewer;
}
