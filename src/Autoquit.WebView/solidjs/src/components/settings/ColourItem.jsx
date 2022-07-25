import { createMemo } from "solid-js"
import { useGlobalState } from "../../store"

export default function ColourItem(props){
    const [ state, getState ] = useGlobalState()

    const classState = createMemo(()=> props.selected ? "border-opacity-60" : "border-opacity-0 hover:border-opacity-40 bg-opacity-80")

    return <div className={`rounded-full w-10 h-10 border-4 transition-all border-${state().getTextColour(state)} bg-${props.color} ${classState()}`} onClick={props.onClick}>

    </div>
}