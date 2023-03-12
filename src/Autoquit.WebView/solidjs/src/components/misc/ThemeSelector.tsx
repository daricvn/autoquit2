import { createMemo } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"
import translate from "../../localization/translate"
import Tooltip from "../tooltip/Tooltip"
import { IAccentSelectorProps } from "./AccentSelector"
import ColourItem from "./ColourItem"



export default function ThemeSelector(props: IAccentSelectorProps){
    const [ state, setState ] = useGlobalState()

    const setTheme = (theme: string)=>{
        setState("temporaryState", 'theme', theme)
        if (props.onChange)
            props.onChange()
    }

    const getTheme = createMemo(()=>{
        if (state.temporaryState && state.temporaryState.theme)
            return state.temporaryState.theme;
        return state.theme
    })

    return <div class="flex space-x-3">
        <Tooltip class="pt-3" value={translate("Light")}><ColourItem color="white" selected={ getTheme() != "dark" } onClick={()=> setTheme("light")} /></Tooltip>
        <Tooltip class="pt-3" value={translate("Dark")}><ColourItem color="gray-700" selected={ getTheme() == "dark" } onClick={()=> setTheme("dark")} /></Tooltip>
    </div>
}