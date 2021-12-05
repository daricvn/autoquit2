import Text from "../components/forms/Text";
import AccentSelector from "../components/settings/AccentSelector";
import ThemeSelector from "../components/settings/ThemeSelector";
import SubContent from "../components/SubContent";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";
import BindingSettings from "./BindingSettings";
import FeatureSettings from "./FeatureSettings";

export default function Settings(){
    const [state, setState] = useGlobalState()

    return <SubContent className="px-8 md:px-24 lg:px-52 mt-4" title={translate("Settings")}>
        <div className={`flex flex-wrap flex-col`}>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <Text className="text-lg self-center">{translate("Theme")}:</Text>
                    <div className="flex-grow"><ThemeSelector /> </div>
                </div>
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <Text className="text-lg self-center">{translate("Accent")}:</Text>
                    <div className="flex-grow"><AccentSelector /> </div>
                </div>
            </div>
            <div className="my-4">
                <hr />
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <Text className="text-lg mb-4">{translate("Key Bindings")}</Text>
                <BindingSettings />
            </div>
            <div className="my-4">
                <hr />
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <Text className="text-lg mb-4">{translate("Tweaks")}</Text>
                <FeatureSettings />
            </div>
        </div>
    </SubContent>
}