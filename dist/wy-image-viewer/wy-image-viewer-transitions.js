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
import { Animation, Transition } from "ionic-angular";
import { BACK_DROP_OPACITY } from "./wy-image-viewer-config";
var WYImageViewerEnter = (function (_super) {
    __extends(WYImageViewerEnter, _super);
    function WYImageViewerEnter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WYImageViewerEnter.prototype.init = function () {
        var css = this.plt.Css;
        var ele = this.enteringView.pageRef().nativeElement;
        var component = this.enteringView.instance;
        var imgElement = component.slide.getActiveSlide()._wrapper.nativeElement;
        var backdropElement = ele.querySelector('ion-backdrop');
        var fromPosition = this.enteringView.data.position; //这里是源图片的的位置、Controller.create的时候传过来的
        var toPosition = imgElement.getBoundingClientRect(); //这里是目标图片的位置
        var flipS = fromPosition.width / toPosition.width; //计算缩放的级别
        var flipY = fromPosition.top - toPosition.top; //计算纵向平移距离
        var flipX = fromPosition.left - toPosition.left; //计算横向平移距离
        var backdrop = new Animation(this.plt, backdropElement); //背景层的动画
        var image = new Animation(this.plt, imgElement); //图片层的动画
        // Using `Animation.beforeStyles()` here does not seems to work
        imgElement.style[css.transformOrigin] = '0 0';
        image.fromTo('translateY', flipY + "px", '0px') //纵轴平移
            .fromTo('translateX', flipX + "px", '0px') //横轴平移
            .fromTo('scale', flipS, 1)
            .afterClearStyles([css.transformOrigin]);
        backdrop.fromTo('opacity', 0.01, BACK_DROP_OPACITY);
        this.easing('ease-in-out')
            .duration(150)
            .add(backdrop)
            .add(image);
        // const enteringPageEle: Element = this.enteringView.pageRef().nativeElement;
        // const enteringNavbarEle = enteringPageEle.querySelector('ion-navbar');
        // const enteringBackBtnEle = enteringPageEle.querySelector('.back-button');
        // const enteringNavBar = new Animation(this.plt, enteringNavbarEle);
        // enteringNavBar.afterAddClass('show-navbar');
        // this.add(enteringNavBar);
        //
        // const enteringBackButton = new Animation(this.plt, enteringBackBtnEle);
        // this.add(enteringBackButton);
        // enteringBackButton.afterAddClass('show-back-button');
    };
    return WYImageViewerEnter;
}(Transition));
export { WYImageViewerEnter };
var WYImageViewerLeave = (function (_super) {
    __extends(WYImageViewerLeave, _super);
    function WYImageViewerLeave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WYImageViewerLeave.prototype.init = function () {
        var css = this.plt.Css;
        var ele = this.leavingView.pageRef().nativeElement;
        var component = this.leavingView.instance;
        var imgElement = component.slide.getActiveSlide()._wrapper.nativeElement;
        var backdropElement = ele.querySelector('ion-backdrop');
        var toPosition = this.leavingView.data.position;
        var fromPosition = imgElement.getBoundingClientRect();
        var flipS = toPosition.width / fromPosition.width;
        var flipY = toPosition.top - fromPosition.top;
        var flipX = toPosition.left - fromPosition.left;
        var backdropOpacity = backdropElement.style['opacity'];
        var backdrop = new Animation(this.plt, backdropElement);
        var image = new Animation(this.plt, imgElement);
        image.fromTo('translateY', 0 + "px", flipY + "px")
            .fromTo('translateX', "0px", flipX + "px")
            .fromTo('scale', 1, flipS)
            .beforeStyles((_a = {}, _a[css.transformOrigin] = '0 0', _a))
            .afterClearStyles([css.transformOrigin]);
        backdrop.fromTo('opacity', backdropOpacity, 0);
        this.easing('ease-in-out')
            .duration(150)
            .add(backdrop)
            .add(image);
        var _a;
    };
    return WYImageViewerLeave;
}(Transition));
export { WYImageViewerLeave };
//# sourceMappingURL=wy-image-viewer-transitions.js.map