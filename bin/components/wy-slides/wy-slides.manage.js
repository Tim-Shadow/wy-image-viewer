var WYSlidesOptions = (function () {
    function WYSlidesOptions() {
    }
    return WYSlidesOptions;
}());
export { WYSlidesOptions };
var WYSlidesManage = (function () {
    function WYSlidesManage(index, _ele, renderer, _config) {
        this.index = index;
        this._ele = _ele;
        this.renderer = renderer;
        this._config = _config;
        this._pageIndex = 0; //当前页面索引，以0开始
        //TODO 将来需要实现能循环的情况
        this._loop = false; //默认为false
        this._config = _config || {};
        this._padding = this._config.padding || 0;
        this._init();
        this._pageIndex = this.index;
    }
    WYSlidesManage.prototype._init = function () {
        var childrenSlide = this._ele.querySelectorAll(".wy-slide-item-container");
        var container = this._ele.querySelector('.wy-slide-control-container');
        this._containerWidth = container.getBoundingClientRect().width;
        this._count = childrenSlide.length;
        for (var i = 0; i < childrenSlide.length; i++) {
            this.renderer.setElementStyle(childrenSlide[i], 'width', this._containerWidth + "px");
            this.renderer.setElementStyle(childrenSlide[i], 'margin-right', this._padding + "px");
        }
    };
    WYSlidesManage.prototype.dragEnd = function (translateX) {
    };
    WYSlidesManage.prototype.getNextTranslateX = function (index) {
        return -index * (this._containerWidth + this._padding);
    };
    WYSlidesManage.prototype.getNextPage = function () {
        //索引+1
        this._pageIndex++;
        if (!this._loop) {
            if (this._pageIndex >= this._count)
                this._pageIndex = this._count - 1;
        }
        else {
            //TODO 需要实现_loop为true的情况
        }
        return this.getNextTranslateX(this._pageIndex);
    };
    WYSlidesManage.prototype.getPrePage = function () {
        this._pageIndex--;
        if (!this._loop) {
            if (this._pageIndex < 0) {
                this._pageIndex = 0;
            }
        }
        else {
            //TODO 需要实现_loop为true的情况
        }
        return this.getNextTranslateX(this._pageIndex);
    };
    WYSlidesManage.prototype.recover = function () {
        return this.getNextTranslateX(this._pageIndex);
    };
    WYSlidesManage.prototype.getIndex = function () {
        return this._pageIndex;
    };
    return WYSlidesManage;
}());
export { WYSlidesManage };
