import { createMemo, createSignal } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import StateButton, { IStateButtonProps } from "../StateButton";

export default function RecordButton(props: IStateButtonProps){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert?.call(null, state)) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "red-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-record-vinyl text-xl absolute left-0",  "fa-solid fa-stop text-xl absolute left-0" ])
    const texts = createMemo(()=> [ "Record", "Stop" ])

    return <StateButton stateClass={stateClasses()} icons={states()} size={6} stateText={texts()} class={`h-14 rounded-full p-3`} stateIndex={getVal()} onClick={()=> setVal(state=> state == 0 ? 1: 0)} disabled={props.disabled}></StateButton>
}