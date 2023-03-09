import { createMemo, For, JSX } from "solid-js";
import { useGlobalState } from "../../context/GlobalStore";
import { IVoid } from "../../interfaces/ICommon";
import translate, { capitalize } from "../../localization/translate";
import { accentPreset } from "../../theme/Theme";
import Tooltip from "../tooltip/Tooltip";

import ColourItem from "./ColourItem";

export interface IAccentSelectorProps extends JSX.HTMLAttributes<HTMLDivElement>{
    onChange: IVoid;
}

export default function AccentSelector(props: IAccentSelectorProps){
    const [ state, setState ] = useGlobalState()

    const setAccent = (name: string)=>{
        setState("temporaryState", "accent", name);
        props.onChange?.call(null);
    }

    const getAccent = createMemo(()=>{
        if (state.temporaryState && state.temporaryState.accent)
            return state.temporaryState.accent
        return state.accent
    })

    return <div class="flex space-x-3">
        <For each={accentPreset}>
            {
                (item)=> 
                <Tooltip class="pt-3" value={translate(capitalize(item.name))}><ColourItem color={item.css.light} selected={ getAccent() == item.name } onClick={()=> setAccent(item.name)} /></Tooltip>
            }
        </For>
    </div>
}