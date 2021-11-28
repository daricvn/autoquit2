import { createContext, useContext } from "solid-js";
import { createStore } from 'solid-js/store'
import { accentPreset, themePreset } from "./theme";

const initStore = {
    theme: '',
    accent: 'ocean',
    process: '',
    size: {},
    block: false,
    getBackground: (state)=> state?.theme == 'dark' ? themePreset.bg_dark: themePreset.bg_light,
    getBackgroundInvert: (state)=> state?.theme == 'dark' ? themePreset.bg_light: themePreset.bg_dark,
    getTextColour: (state)=> state?.theme == 'dark' ? themePreset.txt_dark : themePreset.txt_light,
    getTextColourInvert: (state)=> state?.theme == 'dark' ? themePreset.txt_light : themePreset.txt_dark,
    getAccent: (state)=> {
        let t = 'light'
        if (state.theme)
            t = state.theme
        for(let i=0; i< accentPreset.length; i++)
            if (accentPreset[i].name == state.accent)
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