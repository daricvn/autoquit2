import { For } from "solid-js";
import translate, { capitalize } from "../../libs/i18n";
import { useGlobalState } from "../../store";
import { accentPreset } from "../../theme";
import Tooltip from "../utilities/Tooltip";
import ColourItem from "./ColourItem";

export default function AccentSelector(){
    const [ state, setState ] = useGlobalState()

    const setAccent = (name)=>{
        setState("accent", name)
    }

    return <div className="flex space-x-3">
        <For each={accentPreset}>
            {
                (item)=> 
                <Tooltip className="pt-3" value={translate(capitalize(item.name))}><ColourItem color={item.css.light} selected={ state.accent == item.name } onClick={()=> setAccent(item.name)} /></Tooltip>
            }
        </For>
    </div>
}