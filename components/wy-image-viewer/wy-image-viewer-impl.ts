import {App, Config, NavOptions, ViewController} from "ionic-angular";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {WYImageViewerEnter, WYImageViewerLeave} from "./wy-image-viewer-transitions";

export class WYImageViewerImpl extends ViewController {
    constructor(
        private app: App,
        component: WYImageViewerComponent,
        opts: any = {},
        config: Config) {
        super(component, opts);

        config.setTransition('wy-image-viewer-enter', WYImageViewerEnter);
        config.setTransition('wy-image-viewer-leave', WYImageViewerLeave);
    }

    getTransitionName(direction: string) {
        return `wy-image-viewer-${direction === 'back' ? 'leave' : 'enter'}`;
    }

    present(navOptions: NavOptions = {}) {
        return this.app.present(this, navOptions);
    }

}