import { createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import WaveButton from "../components/buttons/WaveButton";
import Text from "../components/forms/Text";
import AccentSelector from "../components/settings/AccentSelector";
import ThemeSelector from "../components/settings/ThemeSelector";
import SubContent from "../components/SubContent";
import translate from "../libs/i18n";
import BindingSettings from "./BindingSettings";
import FeatureSettings from "./FeatureSettings";

export default function Settings(){
    const [ getDirty, setDirty ] = createSignal(false)



    return <SubContent className="px-8 md:px-24 lg:px-52 mt-4 w-full relative" title={translate("Settings")}>
        <div className={`flex flex-wrap flex-col`}>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <Text className="text-lg self-center">{translate("Theme")}:</Text>
                    <div className="flex-grow"><ThemeSelector onChange={()=> setDirty(true)} /> </div>
                </div>
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <div className="flex flex-row space-x-4 items-stretch">
                    <Text className="text-lg self-center">{translate("Accent")}:</Text>
                    <div className="flex-grow"><AccentSelector onChange={()=> setDirty(true)} /> </div>
                </div>
            </div>
            <div className="my-4">
                <hr />
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <Text className="text-lg mb-4">{translate("Key Bindings")}</Text>
                <BindingSettings onChange={()=> setDirty(true)} />
            </div>
            <div className="my-4">
                <hr />
            </div>
            <div className="px-8 md:px-12 lg:px-16">
                <Text className="text-lg mb-4">{translate("Tweaks")}</Text>
                <FeatureSettings onChange={()=> setDirty(true)} />
            </div>
            <Transition name="slide-left" appear>
                {
                    getDirty() && 
                    <div className="px-8 md:px-12 lg:px-16 mt-8 mr-8 flex justify-end">
                        <div>
                            <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:shadow-inner rounded-full mr-2`}>
                                <i className="fa fa-save mr-2"></i>
                                {translate("Save changes")}
                            </WaveButton>
                        </div>
                        <div>
                            <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-gray-400 border border-gray-400 hover:bg-gray-500 hover:shadow-inner rounded-full mr-2`}>
                                {translate("Reset")}
                            </WaveButton>
                        </div>
                    </div>
                }
            </Transition>
        </div>
    </SubContent>
}