import { createMemo, createSignal } from "solid-js";
import { useGlobalState } from "../../../store";
import StateIconButton from "../StateIconButton";


export default function PlayButton(props){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert(state)) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "green-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-play text-xl absolute left-1 top-0.5",  "fa-solid fa-pause text-xl absolute left-0 top-0.5" ])
    const texts = createMemo(()=> [ "Play", "Pause" ])

    return <StateIconButton stateClasses={stateClasses()} icons={states()} size={6} texts={texts()} className={`h-14 rounded-full p-3`} value={getVal()} onClick={()=> setVal(state=> state == 0 ? 1: 0)} disabled={props.disabled}></StateIconButton>
}