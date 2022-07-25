import { createMemo, createSignal, Show } from "solid-js"
import translate, { capitalize } from "../../libs/i18n";
import { useGlobalState } from "../../store"
import FlatCircleButton from "../buttons/FlatCircleButton";
import EditableDropdown from "../dropdown/EditableDropdown"
import Tooltip from "../utilities/Tooltip";

const DEFAULT_NEW_FILE_ID = -1;

export default function ScriptFileBrowser(props){
    const [ getLoadingState, setLoadingState ] = createSignal()
    const [ getTarget, setTarget ] = createSignal(-1);
    const [ getIndex, setIndex ] = createSignal(-1);
    const [ getInputText, setInputText ] = createSignal("")
    const [ state, setState ] = useGlobalState()

    const onTargetChanged = (e, i)=>{
        setIndex(i)
        setTarget(e.value)
        if (i >= 0)
            handleTextChanged(e.text)
        else handleTextChanged(e)
    }

    const handleTextChanged = (text)=>{
        setInputText(text)
    }

    const saveComponents = createMemo(()=> {
            return <div>
                <Show when={!!getInputText()}>
                    <Tooltip position="top" value={translate("save")}>
                        <FlatCircleButton size={8} color={state().getTextColour(state)}>
                            <i class="fa-solid fa-floppy-disk text-green-500"></i>
                        </FlatCircleButton>
                    </Tooltip>
                </Show>
                <Tooltip position="top" value={`${translate("save as")} (Ctrl+S)`} style="min-width: 90px; text-align: center">
                    <FlatCircleButton size={8} color={state().getTextColour(state)}>
                        <i class="fa-solid fa-file-export text-blue-500"></i>
                    </FlatCircleButton>
                </Tooltip>
            </div>
        }
    )

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
                    appendContent={saveComponents()}
                    position="top"
                    full={true}
                ></EditableDropdown>
    </div>
}