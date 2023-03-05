import { createMemo, createSignal } from "solid-js";
import { useGlobalState } from "../../../store";
import StateIconButton from "../StateIconButton";


export default function RecordButton(props){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert(state)) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "red-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-record-vinyl text-xl absolute left-0",  "fa-solid fa-stop text-xl absolute left-0" ])
    const texts = createMemo(()=> [ "Record", "Stop" ])

    return <StateIconButton stateClasses={stateClasses()} icons={states()} size={5} texts={texts()} className={`h-12 rounded-full p-3`} value={getVal()} onClick={()=> setVal(state=> state == 0 ? 1: 0)} disabled={props.disabled}></StateIconButton>
}