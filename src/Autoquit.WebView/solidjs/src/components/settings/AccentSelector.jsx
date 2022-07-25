import { createMemo, For } from "solid-js";
import translate, { capitalize } from "../../libs/i18n";
import { useGlobalState } from "../../store";
import { accentPreset } from "../../theme";
import Tooltip from "../utilities/Tooltip";
import ColourItem from "./ColourItem";

export default function AccentSelector(props){
    const [ state, setState ] = useGlobalState()

    const setAccent = (name)=>{
        setState("temporaryState", { ...state().temporaryState, accent: name })
        if (props.onChange)
            props.onChange()
    }

    const getAccent = createMemo(()=>{
        if (state().temporaryState && state().temporaryState.accent)
            return state().temporaryState.accent
        return state().accent
    })

    return <div className="flex space-x-3">
        <For each={accentPreset}>
            {
                (item)=> 
                <Tooltip className="pt-3" value={translate(capitalize(item.name))}><ColourItem color={item.css.light} selected={ getAccent() == item.name } onClick={()=> setAccent(item.name)} /></Tooltip>
            }
        </For>
    </div>
}