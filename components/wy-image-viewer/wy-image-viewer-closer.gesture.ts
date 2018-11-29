import {Renderer} from '@angular/core';
import {PanGesture, Platform, Animation, DomController} from 'ionic-angular';
import {pointerCoord} from 'ionic-angular/util/dom';

import {WYImageViewerComponent} from "./wy-image-viewer.component";
import {DRAG_THRESHOLD, HAMMER_THRESHOLD, MAX_ATTACK_ANGLE, BACK_DROP_OPACITY} from "./wy-image-viewer-config";

export class WYImageViewerCloserGesture extends PanGesture {

    private translationY: number;
    private opacity: number;
    private startY: number;
    private imageContainer: HTMLElement;
    private backdrop: HTMLElement;

    constructor(platform: Platform,
                private component: WYImageViewerComponent,
                domCtrl: DomController,
                private renderer: Renderer,
                private cb: Function) {
        super(platform, component.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,
            threshold: HAMMER_THRESHOLD,
            gesture: component._gestureCtrl.createGesture({name: 'wy-image-viewer-closer'}),
            direction: 'y',
            domController: domCtrl
        });

        this.translationY = 0;
        this.listen();
    }


    onDragStart(ev: any): boolean {
        if (isPinching(ev)) {
            this.abort(ev);
        }
        this.imageContainer = this.component.slide.getActiveSlide()._wrapper.nativeElement;
        this.backdrop = <HTMLElement>this.component.getNativeElement().querySelector('ion-backdrop');
        let coord = pointerCoord(ev);
        this.startY = coord.y;
        return true;
    }

    canStart(ev: any): boolean {
        return !this.component.slide.zoomed;
    }

    onDragMove(ev: any): boolean {
        if (isPinching(ev)) {
            this.abort(ev);
        }

        let coord = pointerCoord(ev);
        this.translationY = coord.y - this.startY;
        // noinspection JSSuspiciousNameCombination
        this.opacity = Math.max(BACK_DROP_OPACITY - Math.abs(this.translationY) / (10 * DRAG_THRESHOLD), .1);

        this.plt.raf(() => {
            this.renderer.setElementStyle(this.imageContainer, this.plt.Css.transform, `translateY(${this.translationY}px)`);
            this.renderer.setElementStyle(this.backdrop, 'opacity', this.opacity.toString());
        });

        return false;
    }

    onDragEnd(ev: any): boolean {
        // noinspection JSSuspiciousNameCombination
        if (Math.abs(this.translationY) > DRAG_THRESHOLD) {
            this.cb();
        } else {
            let imageContainerAnimation = new Animation(this.plt, this.imageContainer);
            let backdropAnimation = new Animation(this.plt, this.backdrop);

            backdropAnimation.fromTo('opacity', this.opacity, `${BACK_DROP_OPACITY}`);
            imageContainerAnimation.fromTo('translateY', `${this.translationY}px`, '0px');

            new Animation(this.plt)
                .easing('ease-in')
                .duration(250)
                .add(backdropAnimation)
                .add(imageContainerAnimation)
                .play();
        }
        return true;
    }
}

function isPinching(ev) {
    return ev.touches && ev.touches.length > 1;
}
