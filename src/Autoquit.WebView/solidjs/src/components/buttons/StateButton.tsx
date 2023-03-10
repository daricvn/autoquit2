import { createMemo, For, JSX, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import translate from "../../localization/translate";
import WaveButton from "./WaveButton";

export type StateValue = { [key: number]: string }

export interface IStateButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>
{
    size?: number;
    stateIndex?: number;
    stateClass?: StateValue;
    stateText?: StateValue;
    icons?: string[];
    color?: string;
}

export default function StateButton(props: IStateButtonProps){
    const stateClass = createMemo(()=> {
        if (!props.stateClass) return '';
        return !props.stateIndex ? props.stateClass[0] : props.stateClass[props.stateIndex]
    });
    const stateText = createMemo(()=> 
    {
        if (!props.stateText) return '';
        return !props.stateIndex ? props.stateText[0]: props.stateText[props.stateIndex]
    });

    return <WaveButton class={`${props.class} ${stateClass()}`} onClick={props.onClick} disabled={props.disabled} color={props.color}>
        <div class="flex gap-2 w-full h-full items-center">
            <div class={`relative h-${props.size} w-${props.size} justify-items-center`}>
                <For each={props.icons}>
                {
                    (m, i)=>
                    <Transition name="rotate" appear>
                        <Show when={i() == props.stateIndex || (i() == 0 && !props.stateIndex)}>
                            <i class={m} />
                        </Show>
                    </Transition>
                }
                </For>
            </div>
            <div class="pr-1 text-center grow">
                {translate(stateText())}
            </div>
        </div>
    </WaveButton>
}