import {Animation, PanGesture, Platform} from "ionic-angular";
import {WYSlides} from "./wy-slides";
import {Renderer} from "@angular/core";
import {pointerCoord} from "ionic-angular/util/dom";
import {WYSlidesManage} from "./wy-slides.manage";

const HAMMER_THRESHOLD = 10;
const MAX_ATTACK_ANGLE = 45;
const GESTURE_NAME = 'wy-slides';//手势名称
const DRAG_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 0.6;

export class WYSlidesGesture extends PanGesture {
    renderer: Renderer;
    ele: HTMLElement;
    startX: number;
    translateX: number = 0;
    timeStart: number;


    constructor(plt: Platform,
                private manage: WYSlidesManage,
                private component: WYSlides) {
        super(plt, component.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,                                 //角度阈值，若偏移超过了这个角度则不能触发
            threshold: HAMMER_THRESHOLD,                                //阈值，若移动距离没达到这个阈值则不能触发
                                                                        //用来避免手势冲突的
            gesture: component._gestureCtrl.createGesture({name: GESTURE_NAME}),
            direction: 'x',                                             //方向
            domController: component._domCtrl                           //用以去抖动的，实际使用的是_domCtrl.debouncer()
        });
        this.renderer = component._renderer;
        this.ele = component.getNativeElement().querySelectorAll(".wy-slide-control-container")[0];
        this.translateX = this.manage.getNextTranslateX(this.manage.getIndex());
        this.renderer.setElementStyle(this.ele, 'transform', `translateX(${this.translateX}px)`);
        this.listen();
    }


    canStart() {
        return !this.component.zoomed;
    }


    onDragStart(ev: any) {
        let coord = pointerCoord(ev);
        this.startX = coord.x;
        this.timeStart = new Date().getTime();
    }

    onDragMove(ev: any) {
        let coord = pointerCoord(ev);
        let x = coord.x - this.startX;
        this.renderer.setElementStyle(this.ele, 'transform', `translateX(${this.translateX + x}px)`)
    }

    onDragEnd(ev: any) {
        let coord = pointerCoord(ev);
        let travel = coord.x - this.startX;
        let distance = this.translateX + coord.x - this.startX;
        let speed = travel / (new Date().getTime() - this.timeStart);
        if (Math.abs(travel) > DRAG_THRESHOLD || Math.abs(speed) > VELOCITY_THRESHOLD) {
            if (travel > 0) {
                this.translateX = this.manage.getPrePage();
            } else if (travel < 0) {
                this.translateX = this.manage.getNextPage();
            }
        }
        new Animation(this.plt, this.ele)
            .easing('ease-out')
            .fromTo("translateX", `${distance}px`, `${this.translateX}px`)
            .duration(150)
            .play();
    }

    destroy() {
        this.unlisten();
    }
}