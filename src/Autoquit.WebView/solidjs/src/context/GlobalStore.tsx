import { createContext, createMemo, createSignal, useContext } from "solid-js";
import { createStore, SetStoreFunction } from 'solid-js/store'
import CONSTVAR from "../@static/constVar";
import { IGlobalStore } from "../interfaces/IGlobalStore";
import { AppState } from "../models/AppState";
import { accentPreset, themePreset } from "../theme/Theme";

const initStore : IGlobalStore = {
    theme: 'light',
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
    get getTheme(){
        let theme = this.theme;
        if (this.temporaryState && this.temporaryState.theme)
            theme = this.temporaryState.theme
        return theme;
    },
    get getBackground(){
        return this.getTheme == 'dark' ? themePreset.bg_dark: themePreset.bg_light
    },
    get getHoverBackground() {
        return this.getTheme == 'dark' ? themePreset.bg_dark_hover: themePreset.bg_light_hover
    },
    get getBackgroundInvert() {
        return this.getTheme == 'dark' ? themePreset.bg_light: themePreset.bg_dark
    },
    get getTextColour(){
        return this.getTheme == 'dark' ? themePreset.txt_dark : themePreset.txt_light
    },
    get getTextColourInvert(){
        return this.getTheme == 'dark' ? themePreset.txt_light : themePreset.txt_dark
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
    const [ store, setStore ] = createStore<IGlobalStore>({
        ...initStore,
        get getAccent() {
            return getAccent()
        }
    })

    const getAccent = createMemo(()=> {
        let t = 'base'
        let theme = store.getTheme
        let accent = store.accent
        if (store.temporaryState && store.temporaryState.accent)
            accent = store.temporaryState.accent
        if (!!theme)
            t = theme
        for(let i=0; i< accentPreset.length; i++)
            if (accentPreset[i].name == accent)
                return accentPreset[i].css[t]
        return accentPreset[0].css[t]
    })

    window.setGlobalStore = setStore
    return <StateContext.Provider value={[ store, setStore ]}>
        {props.children}
    </StateContext.Provider>
}
export function useGlobalState() {
    return useContext(StateContext)
}