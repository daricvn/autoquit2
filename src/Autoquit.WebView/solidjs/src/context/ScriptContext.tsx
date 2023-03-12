import { createContext, useContext } from "solid-js"
import { createStore, SetStoreFunction } from "solid-js/store"
import CONSTVAR from "../@static/constVar"
import { IScriptTableConfig } from "../interfaces/IScriptTableConfig"
import { RepeatType } from "../models/RepeatType"

const initStore : IScriptTableConfig = {
    items: [],
    columnSize: [ 60, 0, 65, 85 ],
    minSize: [0, 0, 0, 85],
    index: undefined,
    playbackOptions: {
        speed: 100,
        repeat: {
            type: RepeatType.None,
            total: 1
        }
    },
}

const ScriptContext = createContext<[state: IScriptTableConfig, setter: SetStoreFunction<IScriptTableConfig>]>([
    initStore,
    CONSTVAR.Void
])

export const ScriptContextProvider = (props: { children: any })=>{
    const [ store, setStore ] = createStore(initStore)
    return <ScriptContext.Provider value={[ store, setStore ]}>
        {props.children}
    </ScriptContext.Provider>
}
export function useScriptContext() {
    return useContext(ScriptContext)
}