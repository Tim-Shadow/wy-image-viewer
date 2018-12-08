export const HAMMER_THRESHOLD = 10;
export const MAX_ATTACK_ANGLE = 45;
export const DRAG_THRESHOLD = 70;

export const BACK_DROP_OPACITY = 0.9;

export interface DrawerConfigOptions {
    image?: string;
    imageList: string[];
    position?: ClientRect;
    onCloseCallback?: () => void;

    [prop: string]: any;
}