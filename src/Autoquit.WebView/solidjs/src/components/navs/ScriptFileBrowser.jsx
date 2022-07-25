import { createMemo, createSignal } from "solid-js"
import translate from "../../libs/i18n";
import { useGlobalState } from "../../store"
import EditableDropdown from "../dropdown/EditableDropdown"

const DEFAULT_NEW_FILE_ID = -1;

export default function ScriptFileBrowser(props){
    const [ getLoadingState, setLoadingState ] = createSignal()
    const [ getTarget, setTarget ] = createSignal(-1);
    const [ state, setState ] = useGlobalState()

    const onTargetChanged = (e)=>{

    }

    return <div className="px-3 py-2 block">
        <EditableDropdown
                    isLoading={getLoadingState()}
                    displayMember="Text"
                    dataMember="Id"
                    newItemText={translate("New file")}
                    value={getTarget()}
                    items={[ {Id: 1, Text: "Hello WOrld"}]}
                    onChange={onTargetChanged}
                    placeholder={translate("Select File")}
                    hideClearButton={true}
                    position="top"
                    full={true}
                ></EditableDropdown>
    </div>
}