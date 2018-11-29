var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ViewController } from "ionic-angular";
import { WYImageViewerEnter, WYImageViewerLeave } from "./wy-image-viewer-transitions";
var WYImageViewerImpl = (function (_super) {
    __extends(WYImageViewerImpl, _super);
    function WYImageViewerImpl(app, component, opts, config) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, component, opts) || this;
        _this.app = app;
        config.setTransition('wy-image-viewer-enter', WYImageViewerEnter);
        config.setTransition('wy-image-viewer-leave', WYImageViewerLeave);
        return _this;
    }
    WYImageViewerImpl.prototype.getTransitionName = function (direction) {
        return "wy-image-viewer-" + (direction === 'back' ? 'leave' : 'enter');
    };
    WYImageViewerImpl.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this.app.present(this, navOptions);
    };
    return WYImageViewerImpl;
}(ViewController));
export { WYImageViewerImpl };
