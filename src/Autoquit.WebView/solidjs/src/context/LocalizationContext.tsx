import { Component, createContext, useContext } from "solid-js"
import {createStore, SetStoreFunction} from 'solid-js/store'
import CONSTVAR from "../@static/constVar"
import { updateLanguage } from "../localization/translate"
import { AppRequests } from "../requests/AppRequests"

export interface ILocalizationSettings {
    language: string;
}

const initStore : ILocalizationSettings = {
    language: 'en-UK'
}

const LocalizationContext = createContext<[state: ILocalizationSettings, setter: ((lang: string)=> Promise<string>)]>([
    initStore,
    ()=> Promise.resolve(CONSTVAR.EmptyStr)
])

export const LocalizationContextProvider = (props: { children: any })=>{
    const [ store, setStore ] = createStore<ILocalizationSettings>(initStore)
    const setLanguage = (language: string)=>{
        return new Promise<string>((resolve, reject) => {
            AppRequests.getLanguage(language)
            .then(req=>{
                if (!req.data) return;
                if (req.data.Status == 200)
                {
                    try
                    {
                        let dat = JSON.parse(req.data.Content);
                        updateLanguage(language, dat)
                        setStore('language', language)
                        resolve(language);
                    }
                    catch {
                        reject(req.data.Status)
                    }
                }
                else reject(req.data.Status)
            });
        });
    }
    return <LocalizationContext.Provider value={[ store, setLanguage ]}>
        {props.children}
    </LocalizationContext.Provider>
}

export function useLocalizationContext() {
    return useContext(LocalizationContext)
}