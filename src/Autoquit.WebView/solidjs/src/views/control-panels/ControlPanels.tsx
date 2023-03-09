import { createMemo, createSignal } from "solid-js";
import ButtonPanel from "./ButtonPanel";

export default function ControlPanels(){
    const [ getVal, setVal ] = createSignal(0)
 
    return <div class="w-full flex flex-col gap-2">
        <div class="pt-2">
            <ButtonPanel />
        </div>
        <div class="grow">
            Hi
        </div>
    </div>
}