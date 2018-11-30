import { App, Config, NavOptions, ViewController } from "ionic-angular";
import { WYImageViewerComponent } from "./wy-image-viewer.component";
export declare class WYImageViewerImpl extends ViewController {
    private app;
    constructor(app: App, component: WYImageViewerComponent, opts: any, config: Config);
    getTransitionName(direction: string): string;
    present(navOptions?: NavOptions): Promise<any>;
}
