# wy-image-viewer
仿微信`previewImage`，用来展示一个或者一组图片
## 特点：

1. 支持单张图片展示
2. 支持多张图片展示
3. 支持对展示的图片放大缩小
4. 支持双击图片放大缩小
5. 支持上下拖动某图片关闭Viewer
6. 支持对放大的图片进行拖动

## 使用方式
1. 在`app.module.ts`中引入

	```
	import {WYComponentsModule} from "image-shower";
	```
2. 在`app.module.ts`中的`@NgModule`中引入

	```
	@NgModule({
		...
		imports:[
		...
		WYComponentsModule,
		...
		]
		...
	})
	export class AppModule {
	}
	```
3. 在对应的页面的图片标签中使用

	```
	<ion-content>
    	<img style="width: 100px;height: 100px"
	         [wyImageViewer]="imageArr"
	         (close)="actionClose()"
	         *ngFor="let img of imageArr"
	         [src]="img | safeRes"/>
	</ion-content>
	```
	其中：  
	* wyImageViewer：属性传入的为图片数组
	* close：为对应图片Viewer关闭时触发的事件
	* src：当前被展示的图片

## 后续将实现
1. 无需借助wyImageViewer属性来展示图片，而是可以直接根据图片数组来展示图片
2. 优化放大、缩小以及放大之后图片的平移的动画的流畅度
3. Ionic原生的IonSlides容易导致手势冲突，因此会优化此控件中的WYSlides控件使其支持更多功能且不容易手势冲突
4. Viewer展示更多的除了图片之外的心信息，比如图片名称
5. Viewer支持删除图片操作