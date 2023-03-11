import { createMemo, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import SummaryPanel from "../../components/panels/SummaryPanel";
import { useGlobalState } from "../../context/GlobalStore";
import { AppState } from "../../models/AppState";
import ButtonPanel from "./ButtonPanel";
import PlaybackOptions from "./PlaybackOptions";

export default function ControlPanels(){
    const [ getVal, setVal ] = createSignal(0)
    const [ state, _ ] = useGlobalState()
 
    return <div class="w-full h-full flex flex-col gap-1">
        <div class="grow"> 
            <PlaybackOptions />
        </div>
        <div class="pr-1">
            <Transition name="flip" appear>
                <Show when={ state.appState === AppState.Playback }>
                    <SummaryPanel />
                </Show>
            </Transition>
        </div>
        <div class="p-1">
            <hr />
        </div>
        <div class="pb-2">
            <ButtonPanel />
        </div>
    </div>
}