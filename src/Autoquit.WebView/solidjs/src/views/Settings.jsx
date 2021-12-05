import AccentSelector from "../components/settings/AccentSelector";
import ThemeSelector from "../components/settings/ThemeSelector";
import SubContent from "../components/SubContent";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

export default function Settings(){
    const [state, setState] = useGlobalState()

    return <SubContent className="px-8 md:px-24 lg:px-52 mt-4" title={translate("Settings")}>
        <div className={`flex flex-wrap flex-col`}>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <div className={`text-lg self-center text-${state.getTextColour(state)}`}>{translate("Theme")}:</div>
                    <div className="flex-grow"><ThemeSelector /> </div>
                </div>
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <div className={`text-lg self-center text-${state.getTextColour(state)}`}>{translate("Accent")}:</div>
                    <div className="flex-grow"><AccentSelector /> </div>
                </div>
            </div>
        </div>
    </SubContent>
}