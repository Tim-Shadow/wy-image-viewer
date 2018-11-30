var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { normalizeURL } from "ionic-angular";
var SafeResPipe = (function () {
    function SafeResPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeResPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        value = value ? normalizeURL(value) : value;
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    };
    return SafeResPipe;
}());
SafeResPipe = __decorate([
    Pipe({
        name: 'safeRes',
    }),
    __metadata("design:paramtypes", [DomSanitizer])
], SafeResPipe);
export { SafeResPipe };
//# sourceMappingURL=safe-res.js.map