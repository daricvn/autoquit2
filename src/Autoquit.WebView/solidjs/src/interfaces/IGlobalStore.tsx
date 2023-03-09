import { Part } from "solid-js/store";

export interface IGlobalStore {
    theme?: string;
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
    getTheme?: (state: IGlobalStore) => string | any;
    getBackground?: (state: IGlobalStore) => string | any;
    getHoverBackground?: (state: IGlobalStore) => string | any;
    getBackgroundInvert?: (state: IGlobalStore) => string | any;
    getTextColour?: (state: IGlobalStore) => string | any;
    getTextColourInvert?: (state: IGlobalStore) => string | any;
    getAccent?: (state: IGlobalStore, type?: 'light' | 'dark' | 'base' | undefined) => string | any;
}

export interface IGlobalStoreKeyPreset {
    key: Part<IGlobalStore>,
    name: string,
    desc: string
}