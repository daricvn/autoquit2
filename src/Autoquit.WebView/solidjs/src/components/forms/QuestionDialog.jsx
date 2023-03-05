import { Show } from "solid-js";
import translate from "../../libs/i18n";
import { useGlobalState } from "../../store";
import WaveButton from "../buttons/WaveButton";
import Dialog from "./Dialog";

// export interface IQuestionDialogProps extends JSX.HTMLAttributes<HTMLDivElement> {
//     show: boolean | undefined;
//     ok?: string;
//     cancel?: string;
//     value?: any;
//     containerStyle?: string;
//     zIndex?: number;
//     onAccept?: ()=> void;
//     onReject?: ()=> void;
// }

export default function QuestionDialog(props){
    const [ state, useState ] = useGlobalState()

    const handleClose = ()=>{
        if (props.onReject)
            props.onReject()
    }

    const handleOk = ()=>{
        if (props.onAccept)
            props.onAccept()
    }

    console.log(props.cancel)

    return <Dialog className={`px-6 py-4 w-96 ${props.className}`} show={props.show} transition="slide-down" style={props.style} containerStyle={props.containerStyle} zIndex={props.zIndex}>
        <div className={`block pb-6 text-${state.getTextColour(state)}`}>
            {props.value}
        </div>
        <div className="block pb-2 justify-end flex space-x-2 select-none">
            <div>
                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-${state.getAccent(state)} rounded-lg mr-2 hover:shadow-inner hover:shadow-md`} onClick={handleOk}>
                    {translate(props.ok)}
                </WaveButton>
                <Show when={!!props.cancel}>
                    <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-gray-500 rounded-lg mr-2 hover:shadow-inner hover:bg-gray-600`} onClick={handleClose}>
                        {translate(props.cancel)}
                    </WaveButton>
                </Show>
            </div>
        </div>
    </Dialog>
}