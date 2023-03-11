
import { createMemo, createSignal, lazy, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../context/GlobalStore";
import translate from "../../localization/translate";
import { AppState } from "../../models/AppState";
import { CircularProgressWithText } from "../progress/CircularProgress"
import Tooltip from "../tooltip/Tooltip";

const Settings = lazy(()=> import("../../views/settings/Settings"));

export default function BottomNav(){
    const [ showSetting, setShowSetting] = createSignal<boolean | undefined>(undefined)
    const [ state, _ ] = useGlobalState()
    const gotoSettings = ()=>{
        setShowSetting(true)
    }

    const handleCloseSettings = ()=>{
        setShowSetting(false);
    }

    const isBusy = createMemo(()=> state.appState == AppState.Playback || state.appState == AppState.Recording)

    return <>
        <div class={`w-screen h-9 fixed bottom-0 left-0 block bg-${state.getAccent?.call(state, state)}`}>
        <div class="grid grid-cols-3 gap-1 pt-1">
            <div class="col-span-2">
                <CircularProgressWithText class="pl-2" size={8} width={2} color="white" hidden={!state.processingStatus}>
                    <div class="text-white text-sm pt-1 relative select-none">
                        <Transition name="slide-left">
                            {
                                state.processingStatus &&
                                <span>{translate(state.processingStatus)}</span>
                            }
                        </Transition>
                    </div>
                </CircularProgressWithText>
            </div>
            <div class="text-right pr-1">
                <Tooltip value={translate("Settings")} position="left">
                    <button class={`rounded-full text-white w-8 h-8 group outline-none`}
                        onClick={gotoSettings}
                        disabled={isBusy()}>
                        <i class="fas fa-cog transition-all duration-500 transform group-hover:rotate-180"></i>
                    </button>
                </Tooltip>
            </div>
        </div>
    </div>
    <Show when={showSetting() !== undefined}>
        <Settings show={showSetting()} onClose={handleCloseSettings} />
    </Show>
    </>
}