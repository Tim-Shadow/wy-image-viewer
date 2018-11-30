import { PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { SafeResourceUrl } from "@angular/platform-browser";
export declare class SafeResPipe implements PipeTransform {
    protected sanitizer: DomSanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string, ...args: any[]): SafeResourceUrl;
}
