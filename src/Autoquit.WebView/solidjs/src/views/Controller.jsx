import { createMemo, createSignal } from "solid-js";
import ControlPanel from "./ControlPanel";

export default function Controller(props){
    const [ getVal, setVal ] = createSignal(0)
 
    return <div className="w-full flex flex-col gap-2">
        <div className="pt-2">
            <ControlPanel />
        </div>
        <div className="grow">
            Hi
        </div>
    </div>
}