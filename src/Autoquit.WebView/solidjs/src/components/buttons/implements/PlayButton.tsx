import { createMemo, createSignal } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import StateButton, { IStateButtonProps } from "../StateButton";

export default function PlayButton(props: IStateButtonProps){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert?.call(null, state)) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "green-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-play text-2xl absolute left-3 top-0",  "fa-solid fa-pause text-2xl absolute left-2 top-0" ])
    const texts = createMemo(()=> [ "Play", "Pause" ])
    const color = createMemo(()=> "bg-" + (getVal() == 0 ? state.getTextColourInvert?.call(null, state) : state.getTextColour?.call(null, state)))

    return <StateButton stateClass={stateClasses()} icons={states()} stateText={texts()} size={8} class={`h-16 p-3 ${props.class} ease-in-out duration-200`} stateIndex={getVal()} 
        color={color()}
        onClick={()=> setVal(state=> state == 0 ? 1: 0)} disabled={props.disabled}></StateButton>
}