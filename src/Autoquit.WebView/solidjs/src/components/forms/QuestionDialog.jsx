import { useGlobalState } from "../../store";
import WaveButton from "../buttons/WaveButton";
import Dialog from "./Dialog";

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

    return <Dialog className="px-6 py-4 w-96" show={props.show} transition="slide-down">
        <div className={`block pb-6 text-${state.getTextColour(state)}`}>
            {props.value}
        </div>
        <div className="block pb-2 justify-end flex space-x-2">
            <div>
                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-green-500 rounded-lg mr-2 hover:shadow-inner hover:bg-green-600`} onClick={handleOk}>
                    {props.ok}
                </WaveButton>
                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-gray-500 rounded-lg mr-2 hover:shadow-inner hover:bg-gray-600`} onClick={handleClose}>
                    {props.cancel}
                </WaveButton>
            </div>
        </div>
    </Dialog>
}