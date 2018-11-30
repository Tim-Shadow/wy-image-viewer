import { ElementRef, EventEmitter } from "@angular/core";
import { WYImageViewerController } from "./wy-image-viewer.controller";
export declare class WYImageViewerDirective {
    private _el;
    private imageViewerCtrl;
    imageList: string;
    close: EventEmitter<{}>;
    constructor(_el: ElementRef, imageViewerCtrl: WYImageViewerController);
    onClick(event: Event): void;
}
