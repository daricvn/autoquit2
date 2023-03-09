import { createContext, on, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import CONSTVAR from "../@static/constVar";
import { IObservator, IObservatorState } from "../interfaces/IObservator";

const initStore : IObservator = {
}

const ObservatorContext = createContext<[state: IObservator, setter: SetStoreFunction<IObservator>]>([
    initStore,
    CONSTVAR.Void
])

export const ObservatorContextProvider = (props: { children: any })=>{
    const [ store, setStore ] = createStore<IObservator>(initStore)

    const handleMouseMove = (e: MouseEvent)=>{
        if (!store.target) return;
        let dx = 0;
        if (store.rightToLeft)
            dx = (store.referencePoint?.x ?? 0) - e.clientX;
        else 
            dx = e.clientX - (store.referencePoint?.x ?? 0);
    
        // Update the width of column
        const newWidth = (store.referencePoint?.w ?? 0) + dx;
        setStore('width', newWidth);
        store.target.style.width = newWidth + "px";
    }

    const handleMouseUp = (e: MouseEvent)=>{
        if (store.finish != undefined && store.target != undefined && store.width){
            let lastState : IObservatorState = { target: store.target, width: store.width, index: store.index }
            store.finish?.call(store, lastState);
        }
        setStore('finish', undefined);
        setStore('target', undefined);
    }

    return <ObservatorContext.Provider value={[ store, setStore ]}>
        <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            {props.children}
        </div>
    </ObservatorContext.Provider>
}

export function useObservatorContext() {
    return useContext(ObservatorContext)
}