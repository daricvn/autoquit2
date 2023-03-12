import {  createEffect, createMemo, createSignal, JSX, mergeProps, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { useGlobalState } from "../../context/GlobalStore";

export interface IDialogProps extends JSX.HTMLAttributes<HTMLDivElement> {
    transition?: string;
    show: boolean | undefined;
    zIndex?: number;
    containerStyle?: string;
    fullScreen?: boolean;
}

export default function Dialog(props: IDialogProps){
    const [ state, useState ] = useGlobalState()

    const fullScreenClass = createMemo<string>(()=>{
        if (!props.fullScreen)
            return 'mt-48 flex justify-center'
        return 'h-full left-0'
    })

    const overlayZIndex = createMemo<any>(()=>{
        if (props.zIndex)
            return props.zIndex - 5;
        return 45;
    })

    return <>
        <div class="fixed bottom-0">
        </div>
        <Transition name={props.transition ?? "fade"} appear>
            <Show when={props.show}>
                <div class={`w-full fixed top-0 z-50 ${fullScreenClass()}`} style={`z-index: ${props.zIndex ?? '50'};${props.containerStyle ?? ''}`}>
                    <div class={`relative mx-auto ${state.getBackground} rounded drop-shadow-lg z-50 ${props.class ?? ""}`} style={props.style}>
                        { props.children }
                    </div>
                </div>
            </Show>
        </Transition>
        <Transition name="fade" appear>
            <Show when={props.show}>
                <div class="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black bg-opacity-30" style={`z-index: ${ overlayZIndex() }`} />
            </Show>
        </Transition>
    </>
}