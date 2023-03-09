import { createEffect, createSignal, JSX } from "solid-js";
import { Transition } from "solid-transition-group";
import WaveButton from "../../components/buttons/WaveButton";
import NavigableContent from "../../components/content/NavigableContent";
import Text from "../../components/content/Text";
import Dialog from "../../components/forms/Dialog";
import AccentSelector from "../../components/misc/AccentSelector";
import ThemeSelector from "../../components/misc/ThemeSelector";
import { useGlobalState } from "../../context/GlobalStore";
import { IVoid } from "../../interfaces/ICommon";
import translate from "../../localization/translate";
import BindingSettings from "./BindingSettings";
import FeatureSettings from "./FeatureSettings";

export interface ISettingsProps extends JSX.HTMLAttributes<HTMLDivElement>{
    show?: boolean;
    onClose?: IVoid;
}

export default function Settings(props: ISettingsProps){
    const [ getDirty, setDirty ] = createSignal(false)
    const [ state, setState ] = useGlobalState()

    const undo = ()=>{
        if (!getDirty())
            return;
        setDirty(false)
        setState((state) => ({ ...state, temporaryState: {}}));
    }

    const close = ()=>{
        undo()
        props.onClose?.call(null);
        return false;
    }

    const save = ()=>{
        setDirty(false)
        if (state.temporaryState != null)
            setState(state.temporaryState);
    }

    return <Dialog class="h-full z-10 overflow-y-auto" transition="slide-left" fullScreen={true} show={props.show}>
            <NavigableContent class="px-8 md:px-24 lg:px-52 pt-12 w-full h-full relative pb-4" title={translate("Settings")}
            onNavigateBack={close}>
            <div class={`flex flex-wrap flex-col`}>
                <div class="px-8 md:px-12 lg:px-16">
                    <div class="flex flex-row space-x-4 items-stretch">
                        <Text class="text-lg self-center">{translate("Theme")}:</Text>
                        <div class="flex-grow"><ThemeSelector onChange={()=> setDirty(true)} /> </div>
                    </div>
                </div>
                <div class="px-8 md:px-12 lg:px-16">
                    <div class="flex flex-row space-x-4 items-stretch">
                        <Text class="text-lg self-center">{translate("Accent")}:</Text>
                        <div class="flex-grow"><AccentSelector onChange={()=> setDirty(true)} /> </div>
                    </div>
                </div>
                <div class="my-4">
                    <hr />
                </div>
                <div class="px-8 md:px-12 lg:px-16">
                    <Text class="text-lg mb-4">{translate("Key Bindings")}</Text>
                    <BindingSettings onChange={()=> setDirty(true)} />
                </div>
                <div class="my-4">
                    <hr />
                </div>
                <div class="px-8 md:px-12 lg:px-16">
                    <Text class="text-lg mb-4">{translate("Tweaks")}</Text>
                    <FeatureSettings onChange={()=> setDirty(true)} />
                </div>
                <Transition name="slide-left" appear>
                    {
                        getDirty() && 
                        <div class="px-8 md:px-12 lg:px-16 mt-8 mr-8 mb-4 flex justify-end">
                            <div>
                                <WaveButton class={`transition-colors outline-none px-3 py-1 text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:shadow-inner rounded-full mr-2`}
                                    onClick={save}>
                                    <i class="fa fa-save mr-2"></i>
                                    {translate("Save changes")}
                                </WaveButton>
                            </div>
                            <div>
                                <WaveButton class={`transition-colors outline-none px-3 py-1 text-white bg-gray-400 border border-gray-400 hover:bg-gray-500 hover:shadow-inner rounded-full mr-2`}
                                    onClick={undo}>
                                    {translate("Revert")}
                                </WaveButton>
                            </div>
                        </div>
                    }
                </Transition>
            </div>
        </NavigableContent>
    </Dialog>
}