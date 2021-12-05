import { createSignal } from "solid-js";
import WaveButton from "../components/buttons/WaveButton";
import EditableDropdown from "../components/dropdown/EditableDropdown";
import Header from "../components/navs/Header";
import Tooltip from "../components/utilities/Tooltip";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

export default function MainHeader(){
    const [ state, setState ] = useGlobalState()

    const updateState = ()=>{
        setState('theme', (current)=> current == 'dark'? 'light':'dark')
    }

    return <Header>
        <div className="grid grid-cols-5">
            <div className="col-span-3">
                <EditableDropdown className="pt-1"
                    newItemText={`${translate("Create New")}...`}
                    placeholder={translate("Select File")}
                ></EditableDropdown>
            </div>
            <div class="pl-2 pt-2">
                <WaveButton className={`transition-colors px-3 py-1 text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:shadow-inner rounded-lg mr-2`} onClick={updateState}>
                    <i className="fa fa-save mr-2"></i>
                    {translate("Save")}
                </WaveButton>
                <Tooltip value={translate("Delete File")} position="right">
                    <WaveButton className={`transition-colors px-3 py-1 text-white bg-red-500 border border-red-500 rounded-lg mr-2 hover:shadow-inner hover:bg-red-600`} onClick={updateState}>
                        <i className="fa fa-trash-alt"></i>
                    </WaveButton>
                </Tooltip>
            </div>
        </div>
    </Header>
}