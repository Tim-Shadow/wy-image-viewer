import {Animation, Transition} from "ionic-angular";
import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {BACK_DROP_OPACITY} from "./wy-image-viewer-config";

export class WYImageViewerEnter extends Transition {
    init() {
        const css = this.plt.Css;
        const ele = this.enteringView.pageRef().nativeElement;

        const component: WYImageViewerComponent = this.enteringView.instance;
        const imgElement = component.slide.getActiveSlide()._wrapper.nativeElement;

        const backdropElement = ele.querySelector('ion-backdrop');

        const fromPosition = this.enteringView.data.position;//这里是源图片的的位置、Controller.create的时候传过来的

        const toPosition = imgElement.getBoundingClientRect();//这里是目标图片的位置
        const flipS = fromPosition.width / toPosition.width;//计算缩放的级别
        const flipY = fromPosition.top - toPosition.top;//计算纵向平移距离
        const flipX = fromPosition.left - toPosition.left;//计算横向平移距离

        const backdrop = new Animation(this.plt, backdropElement);//背景层的动画
        const image = new Animation(this.plt, imgElement);//图片层的动画

        // Using `Animation.beforeStyles()` here does not seems to work
        imgElement.style[css.transformOrigin] = '0 0';

        image.fromTo('translateY', `${flipY}px`, '0px')//纵轴平移
            .fromTo('translateX', `${flipX}px`, '0px')//横轴平移
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
    }
}

export class WYImageViewerLeave extends Transition {
    init() {

        const css = this.plt.Css;
        const ele = this.leavingView.pageRef().nativeElement;

        const component: WYImageViewerComponent = this.leavingView.instance;
        const imgElement = component.slide.getActiveSlide()._wrapper.nativeElement;

        const backdropElement = ele.querySelector('ion-backdrop');

        const toPosition = this.leavingView.data.position;
        const fromPosition = imgElement.getBoundingClientRect();

        const flipS = toPosition.width / fromPosition.width;
        const flipY = toPosition.top - fromPosition.top;
        const flipX = toPosition.left - fromPosition.left;

        const backdropOpacity = backdropElement.style['opacity'];

        const backdrop = new Animation(this.plt, backdropElement);
        const image = new Animation(this.plt, imgElement);

        image.fromTo('translateY', `${0}px`, `${flipY}px`)
            .fromTo('translateX', `0px`, `${flipX}px`)
            .fromTo('scale', 1, flipS)
            .beforeStyles({[css.transformOrigin]: '0 0'})
            .afterClearStyles([css.transformOrigin]);

        backdrop.fromTo('opacity', backdropOpacity, 0);

        this.easing('ease-in-out')
            .duration(150)
            .add(backdrop)
            .add(image);
    }
}