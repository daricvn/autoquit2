import { createMemo, createSignal, JSX, Show } from "solid-js"
import { useGlobalState } from "../../../context/GlobalStore";
import { IFileItem } from "../../../interfaces/IFileItem";
import translate from "../../../localization/translate";
import CircleButton from "../../buttons/CircleButton";
import FlatCircleButton from "../../buttons/FlatCircleButton";
import EditableDropdown from "../../dropdown/EditableDropdown";
import Tooltip from "../../tooltip/Tooltip";

const itemTest : IFileItem[] = [
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Hello World 2' },
]


export default function ScriptFileBrowser(props: JSX.InputHTMLAttributes<HTMLInputElement>){
    const [ getLoadingState, setLoadingState ] = createSignal<boolean>(false)
    const [ getTarget, setTarget ] = createSignal<number>(-1);
    const [ getIndex, setIndex ] = createSignal<number>(-1);
    const [ getInputText, setInputText ] = createSignal<string>("")
    const [ state, setState ] = useGlobalState()

    const onTargetChanged = (e: any, i: number)=>{
        setIndex(i)
        setTarget(e.value)
        if (i >= 0)
            handleTextChanged(e.text)
        else handleTextChanged(e)
    }

    const handleTextChanged = (text: string)=>{
        setInputText(text)
    }

    const saveComponents = createMemo(()=> {
            return <div>
                <Show when={!!getInputText()}>
                    <Tooltip position="top" value={`${translate("save")} (Ctrl + S)`} style="min-width: 130px; text-align: center">
                        <FlatCircleButton size={8} color={"bg-" + state.getTextColour?.call(null, state)} disabled={props.disabled}>
                            <i class="fa-solid fa-floppy-disk text-green-500"></i>
                        </FlatCircleButton>
                    </Tooltip>
                </Show>
                <Tooltip position="top" value={translate("save as")} style="min-width: 90px; text-align: center">
                    <FlatCircleButton size={8} color={"bg-" + state.getTextColour?.call(null, state)} disabled={props.disabled}>
                        <i class="fa-solid fa-file-export text-blue-500"></i>
                    </FlatCircleButton>
                </Tooltip>
            </div>
        }
    )

    const itemComponents = (item: any, index: number) =>{
        return <div>
            <CircleButton size={6} class="bg-blue-500 text-white mr-1">
                <i class="fa-solid fa-pen text-xs" style="transform: translateY(-1px)"></i>
            </CircleButton>
            <CircleButton size={6} class="bg-red-500 text-white">
                <i class="fa-solid fa-trash text-xs" style="transform: translateY(-1px)"></i>
            </CircleButton>
        </div>
    }

    return <div class="px-3 py-2 block">
        <EditableDropdown
                    loading={getLoadingState()}
                    displayMember="text"
                    dataMember="id"
                    newItemContent={translate("New file")}
                    value={getTarget()}
                    items={itemTest}
                    onChange={onTargetChanged}
                    placeholder={translate("Select File")}
                    disableClearItem={true}
                    dropdownAppendContent={saveComponents()}
                    position="top"
                    itemAppendContent={itemComponents}
                    noFilter={getIndex() >= 0}
                    disabled={props.disabled}
                ></EditableDropdown>
    </div>
}