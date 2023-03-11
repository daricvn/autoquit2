import { createEffect, createMemo, createSignal, For } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"
import { useScriptContext } from "../../context/ScriptContext"
import translate from "../../localization/translate"
import Checkbox from "../forms/Checkbox"
import { ResizableTable } from "./ResizableTable"
import { IObservatorState } from "../../interfaces/IObservator"
import './ScriptTable.css'
import { createStore } from "solid-js/store"
import FlatCircleButton from "../buttons/FlatCircleButton"
import ScriptTableNav from "../nav/ScriptTableNav"
import ScriptFileBrowser from "../forms/implements/ScriptFileBrowser"
import { ISelectionInfo } from "../../interfaces/ISelectionInfo"
import { AppState } from "../../models/AppState"

export const ScriptTable = ()=>{
    const [ selection, setSelection ] = createStore<ISelectionInfo>({ list: [] })
    const [ getItems, setItems ] = createSignal<any[]>([], {
        equals: false
    })
    const [ state, setState ] = useGlobalState()
    const [ scriptTable, setScriptTable ] = useScriptContext()
    let tableContainer : HTMLDivElement | undefined

    const isBusy = createMemo(()=> state.appState == AppState.Playback)

    const handleColumnSizeChanged = (state?: IObservatorState)=>{
        if (state == null) return;
        setScriptTable('columnSize', state.index ?? 0, state.width ?? 0)
    }

    const handleCheckedChange = (index: number)=>{
        if (selection.list[index])
            setSelection('list', index, false);
        else
            setSelection('list', index, true)
    }

    const handleAddItem = ()=>{
        let items = getItems()
        items.push({ Name: 'new item', Desc: '', Enabled: true })
        setItems(items)
        tableContainer?.scrollTo(0, tableContainer.scrollHeight)
    }

    const handleCheckedAll = ()=>{
        const checkedState = !isCheckedAll();
        for ( let i = 0; i < getItems().length; i++)
            setSelection('list', i, checkedState);
    }
    
    const isCheckedAll = createMemo(()=> {
        let keys = Object.keys(selection.list)
        if (keys.length != getItems().length)
            return false;
        for ( let i = 0; i < keys.length; i++)
            if (!selection.list[+keys[i]])
                return false;
        return true;
    })

    const anySelected = createMemo(()=> {
        let keys = Object.keys(selection.list)
        if (keys.length == 0)
            return false;
        for ( let i = 0; i < keys.length; i++)
            if (selection.list[+keys[i]]) {
                return true;
            }
        return false
    })

    const handleDeleteRequest = ()=>{
        let items = getItems()
        let keys = Object.keys(selection.list).map(x=> +x).sort((a,b) => (a - b))
        if (keys.length == 0)
            return false;
        window.showPrompt("Are you sure want to delete selected item(s)?", 2)
            .then(()=>{
                for ( let i = keys.length - 1; i >= 0; i--)
                    if (selection.list[keys[i]]) {
                        items.splice(keys[i], 1)
                    }
                setSelection((state)=> ({ list: {}}))
                if (items.length == 0)
                    setItems([])
                else
                    setItems([ ...items ]);
            })
            .catch(()=> {})
    }

    const headers = createMemo(()=>{
        return [
            <Checkbox type="checkbox" class="select-none" checked={isCheckedAll()} onChange={handleCheckedAll} />,
            translate("Type"),
            translate("Enabled"),
            "",
        ]
    })

    return <div class={`flex flex-col h-full ${state.getBackground?.call(null, state)} text-${state.getTextColour?.call(null, state)}`} style="max-height: 88vh">
        <div class="flex-auto w-full overflow-y-auto script-table-container" ref={tableContainer}>
            <ResizableTable items={headers()} class={`script-table border padding-table w-full`} columns={scriptTable.columnSize} minColumns={scriptTable.minSize} onSizeChanged={handleColumnSizeChanged}>
                <For each={getItems()}>
                    { (item, i)=> 
                    <tr>
                        <td class="text-center"><Checkbox type="checkbox" class="select-none" checked={!!selection.list[i()]} onChange={(e)=> handleCheckedChange(i())} /></td>
                        <td class="overflow-hidden text-ellipsis">{item.Name}</td>
                        <td class="text-center"><Checkbox type="checkbox" class="select-none" checked={item.Enabled} disabled={isBusy()} /></td>
                        <td class="text-right">
                            <FlatCircleButton size={8} color={"bg-" + state.getTextColour?.call(null, state)} disabled={isBusy()}>
                                <i class={`fa-solid fa-pen-to-square text-${state.getAccent?.call(null, state)}`}></i>
                            </FlatCircleButton>
                            <FlatCircleButton size={8} color={"bg-" + state.getTextColour?.call(null, state)} disabled={isBusy()}>
                                <i class={`fa-solid fa-play text-green`}></i>
                            </FlatCircleButton>
                        </td>
                    </tr>
                }
                </For>
            </ResizableTable>
        </div>
        <div class="pb-1">
            <div class="block">
                <ScriptTableNav showDelete={anySelected()} onDeleteRequest={handleDeleteRequest} onAddRequest={handleAddItem} disabled={isBusy()} />
            </div>
            <div class="grid grid-cols-3">
                <div>             
                </div>
                <div class="col-span-2 block">
                    <ScriptFileBrowser disabled={isBusy()} />
                </div>
            </div>
        </div>
    </div>
}