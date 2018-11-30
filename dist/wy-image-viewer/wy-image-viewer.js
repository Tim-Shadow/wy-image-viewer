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
import { OverlayProxy } from "ionic-angular/navigation/overlay-proxy";
import { WYImageViewerImpl } from "./wy-image-viewer-impl";
var WYImageViewer = (function (_super) {
    __extends(WYImageViewer, _super);
    function WYImageViewer(app, component, opts, config, deepLinker) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, app, component, config, deepLinker) || this;
        _this.opts = opts;
        return _this;
    }
    WYImageViewer.prototype.getImplementation = function () {
        return new WYImageViewerImpl(this._app, this._component, this.opts, this._config);
    };
    return WYImageViewer;
}(OverlayProxy));
export { WYImageViewer };
//# sourceMappingURL=wy-image-viewer.js.map