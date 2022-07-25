import { createMemo } from "solid-js"
import translate from "../../libs/i18n"
import { useGlobalState } from "../../store"
import Tooltip from "../utilities/Tooltip"
import ColourItem from "./ColourItem"

export default function ThemeSelector(props){
    const [ state, setState ] = useGlobalState()

    const setTheme = (theme)=>{
        setState("temporaryState", { ...state().temporaryState, theme: theme })
        if (props.onChange)
            props.onChange()
    }

    const getTheme = createMemo(()=>{
        if (state().temporaryState && state().temporaryState.theme)
            return state().temporaryState.theme;
        return state().theme
    })

    return <div className="flex space-x-3">
        <Tooltip className="pt-3" value={translate("Light")}><ColourItem color="white" selected={ getTheme() != "dark" } onClick={()=> setTheme("light")} /></Tooltip>
        <Tooltip className="pt-3" value={translate("Dark")}><ColourItem color="gray-700" selected={ getTheme() == "dark" } onClick={()=> setTheme("dark")} /></Tooltip>
    </div>
}