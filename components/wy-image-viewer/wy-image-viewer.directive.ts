import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {WYImageViewerController} from "./wy-image-viewer.controller";

@Directive({
    selector: 'img[wyImageViewer]'
})
export class WYImageViewerDirective {

    @Input('wyImageViewer')
    imageList: string[];

    @Output()
    close = new EventEmitter();

    constructor(
        private _el: ElementRef,
        private imageViewerCtrl: WYImageViewerController) {
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        event.stopPropagation();
        const element = this._el.nativeElement;
        const onCloseCallback = () => this.close.emit();
        const imageViewer = this.imageViewerCtrl.create(element, {imageList: this.imageList, onCloseCallback});
        imageViewer.present();
    }
}
