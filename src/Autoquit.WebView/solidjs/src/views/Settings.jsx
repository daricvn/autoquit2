import { createEffect, createSignal, onMount } from "solid-js";
import { Transition } from "solid-transition-group";
import WaveButton from "../components/buttons/WaveButton";
import Dialog from "../components/forms/Dialog";
import Text from "../components/forms/Text";
import AccentSelector from "../components/settings/AccentSelector";
import ThemeSelector from "../components/settings/ThemeSelector";
import SubContent from "../components/SubContent";
import translate from "../libs/i18n";
import { objects } from "../libs/objects";
import { useGlobalState } from "../store";
import BindingSettings from "./BindingSettings";
import FeatureSettings from "./FeatureSettings";

export default function Settings({ show, onClose }){
    const [ getDirty, setDirty ] = createSignal(false)
    const [ state, setState ] = useGlobalState()

    const undo = ()=>{
        if (!getDirty())
            return;
        setDirty(false)
        let previousState = { ...state }
        delete previousState.temporaryState
        objects.trimFuncs(previousState)
        setState('temporaryState', { ...previousState });
    }

    const close = ()=>{
        undo()
        if (onClose)
            onClose();
        return false;
    }

    const save = ()=>{
        setDirty(false)
        var newState = { ...state().temporaryState }
        objects.trimFuncs(newState)
        var keys = Object.keys(newState)
        if (keys.length == 0)
            return
        for (let i = 0; i< keys.length; i++)
            setState(keys[i], newState[keys[i]])
    }


    return <Dialog className="h-full z-10" transition="slide-left" fullScreen={true} show={show()}>
            <SubContent className="px-8 md:px-24 lg:px-52 pt-12 w-full h-full relative" title={translate("Settings")}
            onNavigateBack={close}>
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
                                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:shadow-inner rounded-full mr-2`}
                                    onClick={save}>
                                    <i className="fa fa-save mr-2"></i>
                                    {translate("Save changes")}
                                </WaveButton>
                            </div>
                            <div>
                                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-gray-400 border border-gray-400 hover:bg-gray-500 hover:shadow-inner rounded-full mr-2`}
                                    onClick={undo}>
                                    {translate("Revert")}
                                </WaveButton>
                            </div>
                        </div>
                    }
                </Transition>
            </div>
        </SubContent>
    </Dialog>
}