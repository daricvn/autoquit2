import { Transition } from "solid-transition-group";
import { useGlobalState } from "../../store";

export default function Dialog(props){
    const [ state, useState ] = useGlobalState()
    return <>
        <Transition name={props.transition ?? "fade"} appear>
            {
                !!props.show && 
                <div className={`w-full fixed mt-48 top-0 z-50 flex justify-center`}>
                    <div className={`relative mx-auto ${state.getBackground(state)} rounded drop-shadow-lg z-50 ${props.className ?? ""}`}>
                        { props.children }
                    </div>
                </div>
            }
        </Transition>
        <Transition name="fade" appear>
            {
                !!props.show &&
                <div className="z-40 fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black bg-opacity-30" />
            }
        </Transition>
    </>
}