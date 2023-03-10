import { createMemo, createSignal } from "solid-js";
import ButtonPanel from "./ButtonPanel";
import PlaybackOptions from "./PlaybackOptions";

export default function ControlPanels(){
    const [ getVal, setVal ] = createSignal(0)
 
    return <div class="w-full h-full flex flex-col gap-2">
        <div class="grow"> 
            <PlaybackOptions />
        </div>
        <div class="p-1">
            <hr />
        </div>
        <div class="pb-2">
            <ButtonPanel />
        </div>
    </div>
}