import { Part } from "solid-js/store";
import { AppState } from "../models/AppState";

export interface IGlobalStore {
    theme?: string;
    appState?: AppState;
    language?: string;
    accent?: string;
    target?: string;
    processingStatus?: string;
    preventAccess?: boolean;
    preventHeader?: boolean;
    scanThrottling?: boolean;
    recordMouseMovement?: boolean;
    scanAll?: boolean;
    enableLogging?: boolean;
    temporaryState?: IGlobalStore | undefined;
    getTheme?: string | any;
    getBackground?: string | any;
    getHoverBackground?: string | any;
    getBackgroundInvert?: string | any;
    getTextColour?: string | any;
    getTextColourInvert?: string | any;
    getAccent?: string | any;
}

export interface IGlobalStoreKeyPreset {
    key: Part<IGlobalStore>,
    name: string,
    desc: string
}