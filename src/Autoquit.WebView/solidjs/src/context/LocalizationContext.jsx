import { createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { updateLanguage } from "../libs/i18n"
import { AppRequests } from "../requests/AppRequests"

const initStore = {
    language: 'en-UK'
}

const LocalizationContext = createContext([
    initStore,
    {}
])

export const LocalizationContextProvider = (props)=>{
    const [ store, setStore ] = createStore(initStore)
    
    const setLanguage = (language)=>{
        return new Promise((resolve, reject) => {
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

    var exportStore = [
        store, 
        setLanguage
    ]
    return <LocalizationContext.Provider value={exportStore}>
        {props.children}
    </LocalizationContext.Provider>
}
export function useLocalizationContext() {
    return useContext(LocalizationContext)
}