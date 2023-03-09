import IRect from "../models/Rect";

export interface IObservatorFinishCallback {
    (lastState: IObservatorState): void;
}

export interface IObservator extends IObservatorState {
    finish?: IObservatorFinishCallback;
    rightToLeft?: boolean;
    referencePoint?: IRect;
}

export interface IObservatorState {
    slider?: Element;
    target?: HTMLElement;
    index?: number;
    width?: number;
}