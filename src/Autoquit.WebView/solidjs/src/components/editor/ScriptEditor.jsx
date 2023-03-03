import translate from "../../libs/i18n";
import { useGlobalState } from "../../store";
import Dialog from "../forms/Dialog";

export default function ScriptEditor({ show, value }){
    const [ state, setState ] = useGlobalState()

    return <Dialog show={show}>
        <div className={`block pb-6 text-${state.getTextColour(state)} flex flex-col`}>
            <div className="flex gap-1">
                <div className="select-none">
                    {translate("Action")}
                </div>
                <div className="grow"></div>
            </div>
        </div>
        <div className="block pb-2 justify-end flex space-x-2 select-none">
            <div>
                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-${state.getAccent(state)} rounded-lg mr-2 hover:shadow-inner hover:shadow-md`} 
                    onClick={handleOk}>
                    {translate("Save")}
                </WaveButton>
                <WaveButton className={`transition-colors outline-none px-3 py-1 text-white bg-gray-500 rounded-lg mr-2 hover:shadow-inner hover:bg-gray-600`} 
                    onClick={handleClose}>
                    {translate("Cancel")}
                </WaveButton>
            </div>
        </div>
    </Dialog>
}