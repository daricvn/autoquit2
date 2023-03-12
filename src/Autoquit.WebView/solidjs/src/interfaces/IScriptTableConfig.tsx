import { IPlaybackInfo } from "./IPlaybackInfo";

export interface IScriptTableConfig {
    items?: any[];
    columnSize: number[];
    minSize?: number[];
    playbackOptions?: IPlaybackInfo;
    index?: number;
}