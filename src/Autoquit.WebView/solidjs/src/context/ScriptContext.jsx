import { createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"

const initStore = {
    items: [],
    columnSize: { 0: 60, 1: 0, 2: 65, 3: 85}
}

const ScriptContext = createContext([
    initStore,
    {}
])

export const ScriptContextProvider = (props)=>{
    const [ store, setStore ] = createStore(initStore)
    var exportStore = [
        store, 
        setStore
    ]
    return <ScriptContext.Provider value={exportStore}>
        {props.children}
    </ScriptContext.Provider>
}
export function useScriptContext() {
    return useContext(ScriptContext)
}