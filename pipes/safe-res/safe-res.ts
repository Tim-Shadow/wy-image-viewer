import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {normalizeURL} from "ionic-angular";

@Pipe({
    name: 'safeRes',
})
export class SafeResPipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) {

    }

    transform(value: string, ...args): SafeResourceUrl {
        value = value ? normalizeURL(value) : value;
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
