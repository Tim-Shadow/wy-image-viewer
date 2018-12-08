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
import { PanGesture, Animation } from 'ionic-angular';
import { pointerCoord } from 'ionic-angular/util/dom';
import { DRAG_THRESHOLD, HAMMER_THRESHOLD, MAX_ATTACK_ANGLE, BACK_DROP_OPACITY } from "./wy-image-viewer-config";
var WYImageViewerCloserGesture = (function (_super) {
    __extends(WYImageViewerCloserGesture, _super);
    function WYImageViewerCloserGesture(platform, component, domCtrl, renderer, cb) {
        var _this = _super.call(this, platform, component.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,
            threshold: HAMMER_THRESHOLD,
            gesture: component._gestureCtrl.createGesture({ name: 'wy-image-viewer-closer' }),
            direction: 'y',
            domController: domCtrl
        }) || this;
        _this.component = component;
        _this.renderer = renderer;
        _this.cb = cb;
        _this.translationY = 0;
        _this.listen();
        return _this;
    }
    WYImageViewerCloserGesture.prototype.onDragStart = function (ev) {
        if (isPinching(ev)) {
            this.abort(ev);
        }
        this.imageContainer = this.component.slide.getActiveSlide()._container.nativeElement;
        this.backdrop = this.component.getNativeElement().querySelector('ion-backdrop');
        var coord = pointerCoord(ev);
        this.startY = coord.y;
        return true;
    };
    WYImageViewerCloserGesture.prototype.canStart = function (ev) {
        return !this.component.slide.zoomed;
    };
    WYImageViewerCloserGesture.prototype.onDragMove = function (ev) {
        var _this = this;
        if (isPinching(ev)) {
            this.abort(ev);
        }
        var coord = pointerCoord(ev);
        this.translationY = coord.y - this.startY;
        // noinspection JSSuspiciousNameCombination
        this.opacity = Math.max(BACK_DROP_OPACITY - Math.abs(this.translationY) / (10 * DRAG_THRESHOLD), .1);
        this.plt.raf(function () {
            _this.renderer.setElementStyle(_this.imageContainer, _this.plt.Css.transform, "translateY(" + _this.translationY + "px)");
            _this.renderer.setElementStyle(_this.backdrop, 'opacity', _this.opacity.toString());
        });
        return false;
    };
    WYImageViewerCloserGesture.prototype.onDragEnd = function (ev) {
        // noinspection JSSuspiciousNameCombination
        if (Math.abs(this.translationY) > DRAG_THRESHOLD) {
            this.cb();
        }
        else {
            var imageContainerAnimation = new Animation(this.plt, this.imageContainer);
            var backdropAnimation = new Animation(this.plt, this.backdrop);
            backdropAnimation.fromTo('opacity', this.opacity, "" + BACK_DROP_OPACITY);
            imageContainerAnimation.fromTo('translateY', this.translationY + "px", '0px');
            new Animation(this.plt)
                .easing('ease-in')
                .duration(250)
                .add(backdropAnimation)
                .add(imageContainerAnimation)
                .play();
        }
        return true;
    };
    return WYImageViewerCloserGesture;
}(PanGesture));
export { WYImageViewerCloserGesture };
function isPinching(ev) {
    return ev.touches && ev.touches.length > 1;
}
