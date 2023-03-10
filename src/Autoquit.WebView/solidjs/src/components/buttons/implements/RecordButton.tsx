import { createMemo, createSignal } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import translate from "../../../localization/translate";
import Tooltip from "../../tooltip/Tooltip";
import StateButton, { IStateButtonProps } from "../StateButton";

export default function RecordButton(props: IStateButtonProps){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert?.call(null, state)) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "red-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-record-vinyl text-2xl absolute left-2",  "fa-solid fa-stop text-2xl absolute left-2" ])
    const tooltip = createMemo(()=> getVal() == 0 ? "Record" : "Stop")
    const color = createMemo(()=> "bg-" + (getVal() == 0 ? state.getTextColourInvert?.call(null, state) : state.getTextColour?.call(null, state)))

    return <Tooltip value={translate(tooltip())} position="top">
            <StateButton stateClass={stateClasses()} icons={states()} size={8} class={`h-16 p-3 ${props.class} ease-in-out duration-200`} stateIndex={getVal()} 
                color={color()}
                onClick={()=> setVal(state=> state == 0 ? 1: 0)} disabled={props.disabled}></StateButton>
        </Tooltip>
}