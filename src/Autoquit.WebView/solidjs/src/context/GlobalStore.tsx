import { createContext, createSignal, useContext } from "solid-js";
import { createStore, SetStoreFunction } from 'solid-js/store'
import CONSTVAR from "../@static/constVar";
import { IGlobalStore } from "../interfaces/IGlobalStore";
import { AppState } from "../models/AppState";
import { RepeatType } from "../models/RepeatType";
import { accentPreset, themePreset } from "../theme/Theme";

const initStore : IGlobalStore = {
    theme: '',
    appState: AppState.Idle,
    language: 'en-UK',
    accent: 'ocean',
    target: '',
    processingStatus: '',
    preventAccess: false,
    preventHeader: false,
    scanThrottling: true,
    recordMouseMovement: false,
    enableLogging: false,
    scanAll: false,
    temporaryState: {},
    playbackOptions: {
        repeat: {
            type: RepeatType.None,
            total: 1
        }
    },
    getTheme: (state)=>{
        let theme = state?.theme;
        if (state?.temporaryState && state.temporaryState.theme)
            theme = state.temporaryState.theme
        return theme;
    },
    getBackground: (state)=> {
        return state.getTheme?.call(this, state) == 'dark' ? themePreset.bg_dark: themePreset.bg_light
    },
    getHoverBackground: (state)=> {
        return state.getTheme?.call(this, state) == 'dark' ? themePreset.bg_dark_hover: themePreset.bg_light_hover
    },
    getBackgroundInvert: (state)=> state.getTheme?.call(this,state) == 'dark' ? themePreset.bg_light: themePreset.bg_dark,
    getTextColour: (state)=> {
        return state.getTheme?.call(this, state) == 'dark' ? themePreset.txt_dark : themePreset.txt_light
    },
    getTextColourInvert: (state)=> state.getTheme?.call(this,state) == 'dark' ? themePreset.txt_light : themePreset.txt_dark,
    getAccent: (state, type)=> {
        let t : any = type ?? 'light'
        let theme = state.getTheme?.call(this,state)
        let accent = state.accent
        if (state.temporaryState && state.temporaryState.accent)
            accent = state.temporaryState.accent
        if (theme && !type)
            t = theme
        for(let i=0; i< accentPreset.length; i++)
            if (accentPreset[i].name == accent)
                return accentPreset[i].css[t]
        return accentPreset[0].css[t]
    }
}

const StateContext = createContext<[ get: IGlobalStore, set: SetStoreFunction<IGlobalStore> ]>([
    initStore,
    CONSTVAR.Void
])

declare global {
    interface Window {
      setGlobalStore: any;
    }
  }  

export const StateProvider = (props: { children: any })=>{
    const [ store, setStore ] = createStore<IGlobalStore>(initStore)
    window.setGlobalStore = setStore
    return <StateContext.Provider value={[ store, setStore ]}>
        {props.children}
    </StateContext.Provider>
}
export function useGlobalState() {
    return useContext(StateContext)
}