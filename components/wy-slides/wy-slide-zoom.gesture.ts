import {Animation, Gesture, Platform} from "ionic-angular";
import {DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from "ionic-angular/gestures/hammer";
import {Renderer} from "@angular/core";
import {WYSlide} from "./wy-slide";

const MAX_SCALE = 13;

export class WySlideZoomGesture extends Gesture {

    private adjustScale = 1;            //用来保存前一个状态的scale变量
    private adjustDeltaX = 0;           //用来保存前一个状态的x方向平移量
    private adjustDeltaY = 0;           //用来保存前一个状态的y方向平移量

    private currentScale = 1;
    private currentDeltaX = 0;
    private currentDeltaY = 0;

    private allowedXMargin = 0;
    private allowedYMargin = 0;

    on(type, cb: Function) {
        //解决其ionic-gesture的一个bug，其直接使用options无法对手势设置方向
        let __this: any = this;
        __this._hammer.get(type) && __this._hammer.get(type).set(__this._options);
        super.on(type, cb);
    }

    constructor(private component: WYSlide,
                element: any,
                private platform: Platform,
                private renderer: Renderer) {
        super(element.nativeElement);

        // Force both directions after super to avoid override allowing only one direction
        this.options({direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL});

        this.listen();
        // 注册捏合事件
        this.on('pinch', (e) => this.onPinch(e));
        // 注册捏合结束事件
        this.on('pinchend', (e) => this.onPinchEnd(e));
        // 注册拖动开始事件
        this.on('panstart', (e) => this.onPanStart(e));
        // 注册拖动事件
        this.on('pan', (e) => this.onPan(e));
        // 注册拖动结束事件
        this.on('panend', (e) => this.onPanEnd(e));
        //注册双击事件
        this.on('doubletap', (e) => this.onDoubleTap(e));
    }

    onPinch(event) {
        console.log(event);
        // this.component.dragGesture.abort(event);

        //当前的缩放大小最小为1，最大为MAX_SCALE
        this.currentScale = Math.max(1, Math.min(MAX_SCALE, this.adjustScale * event.scale));

        //x轴平移距离
        this.currentDeltaX = this.adjustDeltaX + (event.deltaX / this.currentScale);
        //y轴平移距离
        this.currentDeltaY = this.adjustDeltaY + (event.deltaY / this.currentScale);

        this.setImageContainerTransform();
    }

    onPinchEnd(event) {
        this.component.zoomed = (this.currentScale !== 1);

        //若当前的缩放登记变为了1，那么需要将图片平移回原来的位置即：0，0
        if (!this.component.zoomed) {
            new Animation(this.platform, this.element)
                .fromTo('translateX', `${this.currentDeltaX}px`, '0')
                .fromTo('translateY', `${this.currentDeltaY}px`, '0')
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
    }

    onPanStart(event) {
        if (!this.component.zoomed) {
            return;
        }
        const originalImageWidth = this.element.offsetWidth;
        const originalImageHeight = this.element.offsetHeight;

        this.allowedXMargin = ((originalImageWidth * this.currentScale) - originalImageWidth) / 4;
        this.allowedYMargin = ((originalImageHeight * this.currentScale) - originalImageHeight) / 4;
    }

    onPan(event) {
        if (!this.component.zoomed) {
            return;
        }
        this.currentDeltaX = boundAdjustment(Math.floor(this.adjustDeltaX + event.deltaX / this.currentScale), this.allowedXMargin);
        this.currentDeltaY = boundAdjustment(Math.floor(this.adjustDeltaY + event.deltaY / this.currentScale), this.allowedYMargin);

        this.setImageContainerTransform();
    }


    onPanEnd(ev) {
        if (!this.component.zoomed) {
            return;
        }
        this.adjustDeltaX = this.currentDeltaX;
        this.adjustDeltaY = this.currentDeltaY;

        this.setImageContainerTransform();
    }

    onDoubleTap(ev) {

        this.component.zoomed = !this.component.zoomed;
        if (this.component.zoomed) {
            new Animation(this.platform, this.element)
                .fromTo('scale', `${this.currentScale}`, `2`)
                .easing('ease-in')
                .duration(50)
                .play();

            this.adjustScale = this.currentScale = 2;

        } else {
            new Animation(this.platform, this.element)
                .fromTo('scale', `${this.adjustScale}`, `1`)
                .fromTo('translateX', `${this.adjustDeltaX}px`, '0')
                .fromTo('translateY', `${this.adjustDeltaY}px`, '0')
                .easing('ease-out')
                .duration(50)
                .play();

            this.adjustDeltaX = this.currentDeltaX = 0;
            this.adjustDeltaY = this.currentDeltaY = 0;
            this.adjustScale = this.currentScale = 1;
        }

    }

    setImageContainerTransform() {
        const transforms = [];
        transforms.push(`scale(${this.currentScale})`);                                     //设置其缩放的值
        transforms.push(`translate(${this.currentDeltaX}px, ${this.currentDeltaY}px)`);     //设置其平移的值

        this.renderer.setElementStyle(this.element, this.platform.Css.transform, transforms.join(' '));
    }
}

function boundAdjustment(adjustement, bound) {
    if (adjustement > bound || adjustement < -bound) {
        return Math.min(bound, Math.max(adjustement, -bound));
    }
    return adjustement;
}