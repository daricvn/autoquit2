import { createContext, createSignal, useContext } from "solid-js";
import { createStore } from 'solid-js/store'
import { accentPreset, themePreset } from "./theme";

const initStore = {
    theme: '',
    language: 'en-UK',
    accent: 'ocean',
    target: '',
    process: '',
    size: {},
    block: false,
    blockHeader: false,
    scanThrottle: true,
    recordMouseMovement: false,
    scanAll: false,
    temporaryState: {},
    getTheme: (state)=>{
        let theme = state?.theme;
        if (state?.temporaryState && state.temporaryState.theme)
            theme = state.temporaryState.theme
        return theme;
    },
    getBackground: (state)=> {
        return state?.getTheme(state) == 'dark' ? themePreset.bg_dark: themePreset.bg_light
    },
    getHoverBackground: (state)=> {
        return state?.getTheme(state) == 'dark' ? themePreset.bg_dark_hover: themePreset.bg_light_hover
    },
    getBackgroundInvert: (state)=> state?.getTheme(state) == 'dark' ? themePreset.bg_light: themePreset.bg_dark,
    getTextColour: (state)=> {
        return state?.getTheme(state) == 'dark' ? themePreset.txt_dark : themePreset.txt_light
    },
    getTextColourInvert: (state)=> state?.getTheme(state) == 'dark' ? themePreset.txt_light : themePreset.txt_dark,
    getAccent: (state, type)=> {
        let t = type ?? 'light'
        let theme = state.getTheme(state)
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

const StateContext = createContext([
    initStore,
    {}
])

export const StateProvider = (props)=>{
    const [ store, setStore ] = createStore(initStore)
    var exportStore = [
        store, 
        setStore
    ]
    return <StateContext.Provider value={exportStore}>
        {props.children}
    </StateContext.Provider>
}
export function useGlobalState() {
    return useContext(StateContext)
}