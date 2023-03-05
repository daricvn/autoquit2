import { createMemo, For, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import translate from "../../libs/i18n";
import WaveButton from "./WaveButton";

// stateClasses: class for states
// class
// states
// value

export default function StateIconButton(props){
    const stateClass = createMemo(()=> !props.value ? props.stateClasses[0] : props.stateClasses[props.value]);
    const stateText = createMemo(()=> !props.value ? props.texts[0]: props.texts[props.value]);

    return <WaveButton className={`${props.className} ${stateClass()}`} onClick={props.onClick} disabled={props.disabled}>
        <div className="flex gap-2 w-full h-full items-center">
            <div className={`relative h-${props.size} w-${props.size}`}>
                <For each={props.icons}>
                {
                    (m, i)=>
                    <Transition name="rotate" appear>
                        <Show when={i() == props.value || (i() == 0 && !props.value)}>
                            <i className={m} />
                        </Show>
                    </Transition>
                }
                </For>
            </div>
            <div className="pr-1">
                {translate(stateText())}
            </div>
        </div>
    </WaveButton>
}