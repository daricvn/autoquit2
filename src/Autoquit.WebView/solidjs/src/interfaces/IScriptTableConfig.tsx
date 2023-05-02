import { IPlaybackInfo } from "./IPlaybackInfo";
import IScriptItemBriefInfo from "./IScriptItemBriefInfo";

export interface IScriptTableConfig {
    items?: IScriptItemBriefInfo[];
    columnSize: number[];
    minSize?: number[];
    playbackOptions?: IPlaybackInfo;
    index?: number;
}