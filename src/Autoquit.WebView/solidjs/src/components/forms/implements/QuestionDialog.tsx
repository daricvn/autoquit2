import { JSX, Show } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import WaveButton from "../../buttons/WaveButton";
import Dialog from "../Dialog";

export interface IQuestionDialogProps extends JSX.HTMLAttributes<HTMLDivElement> {
    show: boolean | undefined;
    ok?: string;
    cancel?: string;
    value?: any;
    containerStyle?: string;
    zIndex?: number;
    onAccept?: ()=> void;
    onReject?: ()=> void;
}

export default function QuestionDialog(props: IQuestionDialogProps){
    const [ state, useState ] = useGlobalState()

    const handleClose = ()=>{
        if (props.onReject)
            props.onReject()
    }

    const handleOk = ()=>{
        if (props.onAccept)
            props.onAccept()
    }

    return <Dialog class={`px-6 py-4 w-96 ${props.class}`} show={props.show} transition="slide-down" style={props.style} containerStyle={props.containerStyle} zIndex={props.zIndex}>
        <div class={`block pb-6 text-${state.getTextColour}`}>
            {props.value}
        </div>
        <div class="block pb-2 justify-end flex space-x-2 select-none">
            <div>
                <WaveButton class={`transition-colors outline-none px-3 py-1 text-white bg-${state.getAccent} rounded-lg mr-2 hover:shadow-inner hover:shadow-md`} onClick={handleOk}>
                    {props.ok}
                </WaveButton>
                <Show when={!!props.cancel}>
                    <WaveButton class={`transition-colors outline-none px-3 py-1 text-white bg-gray-500 rounded-lg mr-2 hover:shadow-inner hover:bg-gray-600`} onClick={handleClose}>
                        {props.cancel}
                    </WaveButton>
                </Show>
            </div>
        </div>
    </Dialog>
}