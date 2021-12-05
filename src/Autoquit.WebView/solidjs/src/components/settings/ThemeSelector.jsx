import translate from "../../libs/i18n"
import { useGlobalState } from "../../store"
import Tooltip from "../utilities/Tooltip"
import ColourItem from "./ColourItem"

export default function ThemeSelector(){
    const [ state, setState ] = useGlobalState()

    const setTheme = (theme)=>{
        setState("theme", ()=> theme)
    }

    return <div className="flex space-x-3">
        <Tooltip className="pt-3" value={translate("Light")} offset="16"><ColourItem color="white" selected={ state.theme != "dark" } onClick={()=> setTheme("light")} /></Tooltip>
        <Tooltip className="pt-3" value={translate("Dark")} offset="16"><ColourItem color="gray-700" selected={ state.theme == "dark" } onClick={()=> setTheme("dark")} /></Tooltip>
    </div>
}