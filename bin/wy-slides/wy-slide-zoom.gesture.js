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
import { Animation, Gesture } from "ionic-angular";
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from "ionic-angular/gestures/hammer";
var MAX_SCALE = 13;
var WySlideZoomGesture = (function (_super) {
    __extends(WySlideZoomGesture, _super);
    function WySlideZoomGesture(component, element, platform, renderer) {
        var _this = _super.call(this, element.nativeElement) || this;
        _this.component = component;
        _this.platform = platform;
        _this.renderer = renderer;
        _this.adjustScale = 1; //用来保存前一个状态的scale变量
        _this.adjustDeltaX = 0; //用来保存前一个状态的x方向平移量
        _this.adjustDeltaY = 0; //用来保存前一个状态的y方向平移量
        _this.currentScale = 1;
        _this.currentDeltaX = 0;
        _this.currentDeltaY = 0;
        _this.allowedXMargin = 0;
        _this.allowedYMargin = 0;
        // Force both directions after super to avoid override allowing only one direction
        _this.options({ direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL });
        _this.listen();
        // 注册捏合事件
        _this.on('pinch', function (e) { return _this.onPinch(e); });
        // 注册捏合结束事件
        _this.on('pinchend', function (e) { return _this.onPinchEnd(e); });
        // 注册拖动开始事件
        _this.on('panstart', function (e) { return _this.onPanStart(e); });
        // 注册拖动事件
        _this.on('pan', function (e) { return _this.onPan(e); });
        // 注册拖动结束事件
        _this.on('panend', function (e) { return _this.onPanEnd(e); });
        //注册双击事件
        _this.on('doubletap', function (e) { return _this.onDoubleTap(e); });
        return _this;
    }
    WySlideZoomGesture.prototype.on = function (type, cb) {
        //解决其ionic-gesture的一个bug，其直接使用options无法对手势设置方向
        var __this = this;
        __this._hammer.get(type) && __this._hammer.get(type).set(__this._options);
        _super.prototype.on.call(this, type, cb);
    };
    WySlideZoomGesture.prototype.onPinch = function (event) {
        console.log(event);
        // this.component.dragGesture.abort(event);
        //当前的缩放大小最小为1，最大为MAX_SCALE
        this.currentScale = Math.max(1, Math.min(MAX_SCALE, this.adjustScale * event.scale));
        //x轴平移距离
        this.currentDeltaX = this.adjustDeltaX + (event.deltaX / this.currentScale);
        //y轴平移距离
        this.currentDeltaY = this.adjustDeltaY + (event.deltaY / this.currentScale);
        this.setImageContainerTransform();
    };
    WySlideZoomGesture.prototype.onPinchEnd = function (event) {
        this.component.zoomed = (this.currentScale !== 1);
        //若当前的缩放登记变为了1，那么需要将图片平移回原来的位置即：0，0
        if (!this.component.zoomed) {
            new Animation(this.platform, this.element)
                .fromTo('translateX', this.currentDeltaX + "px", '0')
                .fromTo('translateY', this.currentDeltaY + "px", '0')
                .easing('ease-in')
                .duration(50)
                .play();
            this.currentDeltaX = 0;
            this.currentDeltaY = 0;
        }
        // Saving the final transforms for adjustment next time the user interacts.
        this.adjustScale = this.currentScale;
        this.adjustDeltaX = this.currentDeltaX;
        this.adjustDeltaY = this.currentDeltaY;
        this.setImageContainerTransform();
    };
    WySlideZoomGesture.prototype.onPanStart = function (event) {
        if (!this.component.zoomed) {
            return;
        }
        var originalImageWidth = this.element.offsetWidth;
        var originalImageHeight = this.element.offsetHeight;
        this.allowedXMargin = ((originalImageWidth * this.currentScale) - originalImageWidth) / 4;
        this.allowedYMargin = ((originalImageHeight * this.currentScale) - originalImageHeight) / 4;
    };
    WySlideZoomGesture.prototype.onPan = function (event) {
        if (!this.component.zoomed) {
            return;
        }
        this.currentDeltaX = boundAdjustment(Math.floor(this.adjustDeltaX + event.deltaX / this.currentScale), this.allowedXMargin);
        this.currentDeltaY = boundAdjustment(Math.floor(this.adjustDeltaY + event.deltaY / this.currentScale), this.allowedYMargin);
        this.setImageContainerTransform();
    };
    WySlideZoomGesture.prototype.onPanEnd = function (ev) {
        if (!this.component.zoomed) {
            return;
        }
        this.adjustDeltaX = this.currentDeltaX;
        this.adjustDeltaY = this.currentDeltaY;
        this.setImageContainerTransform();
    };
    WySlideZoomGesture.prototype.onDoubleTap = function (ev) {
        this.component.zoomed = !this.component.zoomed;
        if (this.component.zoomed) {
            new Animation(this.platform, this.element)
                .fromTo('scale', "" + this.currentScale, "2")
                .easing('ease-in')
                .duration(50)
                .play();
            this.adjustScale = this.currentScale = 2;
        }
        else {
            new Animation(this.platform, this.element)
                .fromTo('scale', "" + this.adjustScale, "1")
                .fromTo('translateX', this.adjustDeltaX + "px", '0')
                .fromTo('translateY', this.adjustDeltaY + "px", '0')
                .easing('ease-out')
                .duration(50)
                .play();
            this.adjustDeltaX = this.currentDeltaX = 0;
            this.adjustDeltaY = this.currentDeltaY = 0;
            this.adjustScale = this.currentScale = 1;
        }
    };
    WySlideZoomGesture.prototype.setImageContainerTransform = function () {
        var transforms = [];
        transforms.push("scale(" + this.currentScale + ")"); //设置其缩放的值
        transforms.push("translate(" + this.currentDeltaX + "px, " + this.currentDeltaY + "px)"); //设置其平移的值
        this.renderer.setElementStyle(this.element, this.platform.Css.transform, transforms.join(' '));
    };
    return WySlideZoomGesture;
}(Gesture));
export { WySlideZoomGesture };
function boundAdjustment(adjustement, bound) {
    if (adjustement > bound || adjustement < -bound) {
        return Math.min(bound, Math.max(adjustement, -bound));
    }
    return adjustement;
}
