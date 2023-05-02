import { createMemo } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import translate from "../../../localization/translate";
import { AppState } from "../../../models/AppState";
import { ScriptRequests } from "../../../requests/ScriptRequests";
import Tooltip from "../../tooltip/Tooltip";
import StateButton, { IStateButtonProps } from "../StateButton";

export default function RecordButton(props: IStateButtonProps){
    const [ state, setState ] = useGlobalState()
    const textColor = createMemo(()=> "text-" + state.getTextColourInvert) 
    const mainColor = createMemo(()=> props.disabled ? "gray-400" : "red-600");
    const stateClasses = createMemo(()=> [ `bg-${mainColor()} ${textColor()}`, `border-4 border-${mainColor()} text-${mainColor()}` ])
    const states = createMemo(()=> [ "fa-solid fa-record-vinyl text-2xl absolute left-2",  "fa-solid fa-stop text-2xl absolute left-2" ])
    const tooltip = createMemo(()=> state.appState == AppState.Idle ? "Record" : "Stop")
    const color = createMemo(()=> "bg-" + (state.appState == AppState.Idle ? state.getTextColourInvert : state.getTextColour))
    const handleStateChange = ()=> {
        var newState = state.appState == AppState.Idle ? AppState.Recording : AppState.Idle;
        setRecordState(newState)
    }
    const stateIndex = createMemo(()=> state.appState == AppState.Recording ? 1 : 0);

    const setRecordState = (newState: AppState) =>
    {
        const stateChanged = state.appState != newState;
        const prevState = state.appState;
        setState('appState', newState);
        if (!stateChanged) return;
        if (newState == AppState.Recording)
        {
                ScriptRequests.startRecord();
        }
        else if (prevState == AppState.Recording)
        {
                ScriptRequests.stopRecord();
        }
    }

    (window as any).setRecordState = setRecordState;

    return <Tooltip value={translate(tooltip())} position="top">
            <StateButton stateClass={stateClasses()} icons={states()} size={8} class={`h-16 p-3 ${props.class} ease-in-out duration-200`} stateIndex={stateIndex()} 
                color={color()}
                onClick={handleStateChange} disabled={props.disabled}></StateButton>
        </Tooltip>
}