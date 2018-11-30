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
import { Animation, PanGesture } from "ionic-angular";
import { pointerCoord } from "ionic-angular/util/dom";
var HAMMER_THRESHOLD = 10;
var MAX_ATTACK_ANGLE = 45;
var GESTURE_NAME = 'wy-slides'; //手势名称
var DRAG_THRESHOLD = 100;
var VELOCITY_THRESHOLD = 0.6;
var WYSlidesGesture = (function (_super) {
    __extends(WYSlidesGesture, _super);
    function WYSlidesGesture(plt, manage, component) {
        var _this = _super.call(this, plt, component.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,
            threshold: HAMMER_THRESHOLD,
            //用来避免手势冲突的
            gesture: component._gestureCtrl.createGesture({ name: GESTURE_NAME }),
            direction: 'x',
            domController: component._domCtrl //用以去抖动的，实际使用的是_domCtrl.debouncer()
        }) || this;
        _this.manage = manage;
        _this.component = component;
        _this.translateX = 0;
        _this.renderer = component._renderer;
        _this.ele = component.getNativeElement().querySelectorAll(".wy-slide-control-container")[0];
        _this.translateX = _this.manage.getNextTranslateX(_this.manage.getIndex());
        _this.renderer.setElementStyle(_this.ele, 'transform', "translateX(" + _this.translateX + "px)");
        _this.listen();
        return _this;
    }
    WYSlidesGesture.prototype.canStart = function () {
        return !this.component.zoomed;
    };
    WYSlidesGesture.prototype.onDragStart = function (ev) {
        var coord = pointerCoord(ev);
        this.startX = coord.x;
        this.timeStart = new Date().getTime();
    };
    WYSlidesGesture.prototype.onDragMove = function (ev) {
        var coord = pointerCoord(ev);
        var x = coord.x - this.startX;
        this.renderer.setElementStyle(this.ele, 'transform', "translateX(" + (this.translateX + x) + "px)");
    };
    WYSlidesGesture.prototype.onDragEnd = function (ev) {
        var coord = pointerCoord(ev);
        var travel = coord.x - this.startX;
        var distance = this.translateX + coord.x - this.startX;
        var speed = travel / (new Date().getTime() - this.timeStart);
        if (Math.abs(travel) > DRAG_THRESHOLD || Math.abs(speed) > VELOCITY_THRESHOLD) {
            if (travel > 0) {
                this.translateX = this.manage.getPrePage();
            }
            else if (travel < 0) {
                this.translateX = this.manage.getNextPage();
            }
        }
        new Animation(this.plt, this.ele)
            .easing('ease-out')
            .fromTo("translateX", distance + "px", this.translateX + "px")
            .duration(150)
            .play();
    };
    WYSlidesGesture.prototype.destroy = function () {
        this.unlisten();
    };
    return WYSlidesGesture;
}(PanGesture));
export { WYSlidesGesture };
//# sourceMappingURL=wy-slides.gesture.js.map