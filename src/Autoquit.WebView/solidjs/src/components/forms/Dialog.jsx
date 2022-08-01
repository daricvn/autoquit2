import { createComputed, createMemo } from "solid-js";
import { Transition } from "solid-transition-group";
import { useGlobalState } from "../../store";

export default function Dialog(props){
    const [ state, useState ] = useGlobalState()

    const fullScreenClass = createMemo(()=>{
        if (!props.fullScreen)
            return 'mt-48 flex justify-center'
        return 'h-full left-0'
    })

    const overlayZIndex = createMemo(()=>{
        if (props.zIndex)
            return props.zIndex - 5;
        return 45;
    })

    return <>
        <Transition name={props.transition ?? "fade"} appear>
            <Show when={props.show}>
                <div className={`w-full fixed top-0 z-50 ${fullScreenClass()}`} style={`z-index: ${props.zIndex ?? '50'};${props.containerStyle ?? ''}`}>
                    <div className={`relative mx-auto ${state.getBackground(state)} rounded drop-shadow-lg z-50 ${props.className ?? ""}`} style={props.style}>
                        { props.children }
                    </div>
                </div>
            </Show>
        </Transition>
        <Transition name="fade" appear>
            <Show when={props.show}>
                <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black bg-opacity-30" style={`z-index: ${ overlayZIndex() }`} />
            </Show>
        </Transition>
    </>
}