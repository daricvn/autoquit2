import { createEffect, createMemo, createSignal, For, Show } from "solid-js"
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
import { createVirtualizer } from "@tanstack/solid-virtual"
import { debounce } from "@solid-primitives/scheduled"

const ROW_SIZE : number = 41;

export const ScriptTable = ()=>{
    const [ selection, setSelection ] = createStore<ISelectionInfo>({ list: [] })
    const debounceUpdate = debounce((method: ()=> void)=> method(), 100);
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
        setScriptTable('items', (prev)=> [ ...prev!, { Name: 'new item', Desc: '', Enabled: true }])
        debounceUpdate(scrollToBottom)
    }

    const handleCheckedAll = ()=>{
        const checkedState = !isCheckedAll();
        for ( let i = 0; i < (scriptTable.items?.length ?? 0); i++)
            setSelection('list', i, checkedState);
    }
    
    const isCheckedAll = createMemo(()=> {
        let keys = Object.keys(selection.list)
        if (keys.length != scriptTable.items?.length)
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
        let items = scriptTable.items?.map(x=> x);
        let keys = Object.keys(selection.list).map(x=> +x).sort((a,b) => (a - b))
        let currentFocusIndex = scriptTable.index;
        if (keys.length == 0)
            return false;
        window.showPrompt("Are you sure want to delete selected item(s)?", 2)
            .then(()=>{
                for ( let i = keys.length - 1; i >= 0; i--)
                    if (selection.list[keys[i]]) {
                        items?.splice(keys[i], 1)
                        if (keys[i] == currentFocusIndex)
                            setScriptTable('index', undefined);
                    }
                setSelection((state)=> ({ list: {}}))
                if ((items?.length ?? 0) > 0)
                    setScriptTable('items', items);
                else 
                    setScriptTable('items', []);
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

    const rowVisualizer = createMemo(()=>{
        let res = createVirtualizer({
            count: scriptTable.items?.length ?? 0,
            getScrollElement: ()=> (tableContainer as Element),
            estimateSize:()=> ROW_SIZE,
            overscan: 3
        })
        return res;
    });

    const scrollToBottom = ()=>{
        rowVisualizer().scrollToIndex(scriptTable.items?.length ?? 0);
        tableContainer?.scrollTo(0, tableContainer.scrollHeight)
    }

    const paddingTop = createMemo(()=> rowVisualizer().getVirtualItems()?.[0]?.start || 0);
    const paddingBottom = createMemo(()=> rowVisualizer().getTotalSize() - (rowVisualizer().getVirtualItems()?.[rowVisualizer().getVirtualItems().length - 1]?.end || 0));

    return <div class={`flex flex-col h-full ${state.getBackground} text-${state.getTextColour}`} style="max-height: 88vh">
        <div class="flex-auto w-full overflow-y-auto script-table-container" ref={tableContainer}>
            <ResizableTable items={headers()} class={`script-table border padding-table w-full`} columns={scriptTable.columnSize} minColumns={scriptTable.minSize} onSizeChanged={handleColumnSizeChanged}>
                <Show when={paddingTop() > 0}>
                    <tr>
                        <td style={`height: ${paddingTop()}px`}></td>
                    </tr>
                </Show>
                <For each={rowVisualizer().getVirtualItems()}>
                    { (item)=> 
                    <tr class={item.index == scriptTable.index ? "bg-"+ state.getAccent + "/25 ease-out duration-200":''}>
                        <td class="text-center"><Checkbox type="checkbox" class="select-none" checked={!!selection.list[item.index]} onChange={(e)=> handleCheckedChange(item.index)} /></td>
                        <td class="overflow-hidden text-ellipsis">{scriptTable.items?.[item.index].Name}</td>
                        <td class="text-center"><Checkbox type="checkbox" class="select-none" checked={scriptTable.items?.[item.index].Enabled} disabled={isBusy()} /></td>
                        <td class="text-right">
                            <FlatCircleButton size={8} color={"bg-" + state.getTextColour} disabled={isBusy()}>
                                <i class={`fa-solid fa-pen-to-square text-${state.getAccent}`}></i>
                            </FlatCircleButton>
                            <FlatCircleButton size={8} color={"bg-" + state.getTextColour} disabled={isBusy()}
                                onClick={()=> setScriptTable('index', item.index)}>
                                <i class={`fa-solid fa-play text-green`}></i>
                            </FlatCircleButton>
                        </td>
                    </tr>
                }
                </For>
                <Show when={paddingBottom() > 0}>
                    <tr>
                        <td style={`height: ${paddingBottom()}px`}></td>
                    </tr>
                </Show>
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