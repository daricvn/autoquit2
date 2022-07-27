import { createEffect, createMemo, createSignal, For } from "solid-js"
import { useScriptContext } from "../../context/ScriptContext"
import translate from "../../libs/i18n"
import { useGlobalState } from "../../store"
import FlatCircleButton from "../buttons/FlatCircleButton"
import ScriptFileBrowser from "../navs/ScriptFileBrowser"
import ScriptTableNav from "../navs/ScriptTableNav"
import { ResizableTable } from "./ResizableTable"
import './ScriptTable.css'

var itemsTest = []
for (let ti = 0; ti < 20; ti++)
    itemsTest.push( { Name: ti, Desc: "Desc " + ti, Enabled: true } );

export const ScriptTable = ()=>{
    const [ getSelected, setSelected ] = createSignal({})
    const [ getItems, setItems ] = createSignal(itemsTest)
    const [ state, setState ] = useGlobalState()
    const [ scriptTable, setScriptTable ] = useScriptContext()
    let tableContainer

    const handleColumnSizeChanged = (col, index, width)=>{
        setScriptTable('columnSize', { ...scriptTable.columnSize, [index]: width })
    }

    const handleCheckedChange = (index)=>{
        if (getSelected()[index])
            setSelected({ ...getSelected(), [index]: false});
        else
            setSelected({ ...getSelected(), [index]: true})
    }

    const handleAddItem = ()=>{
        let items = getItems()
        items.push({ Name: 'new item', Desc: '', Enabled: true })
        setItems([ ...items ])
        tableContainer.scrollTo(0, tableContainer.scrollHeight)
    }

    const handleCheckedAll = ()=>{
        let newObj = {}
        const checkedState = !isCheckedAll();
        for ( let i = 0; i < getItems().length; i++)
            newObj[i] = checkedState;
        setSelected(newObj)
    }
    
    const isCheckedAll = createMemo(()=> {
        let keys = Object.keys(getSelected())
        if (keys.length != getItems().length)
            return false;
        for ( let i = 0; i < keys.length; i++)
            if (!getSelected()[keys[i]])
                return false;
        return true;
    })

    const anySelected = createMemo(()=> {
        let arr = getSelected()
        let keys = Object.keys(arr)
        if (keys.length == 0)
            return false;
        for ( let i = 0; i < keys.length; i++)
            if (arr[keys[i]]) {
                return true;
            }
        return false
    })

    const handleDeleteRequest = ()=>{
        let selected = getSelected()
        let items = getItems()
        let keys = Object.keys(selected).sort((a,b) => (a - b))
        if (keys.length == 0)
            return false;
        window.showPrompt(translate("Are you sure want to delete selected item(s)?"), 2)
            .then(()=>{
                for ( let i = keys.length - 1; i >= 0; i--)
                    if (selected[keys[i]]) {
                        items.splice(keys[i], 1)
                    }
                setSelected({})
                if (items.length == 0)
                    setItems([])
                else
                    setItems([ ...items ]);
            })
    }

    const headers = createMemo(()=>{
        return [
            <input type="checkbox" className="select-none" checked={isCheckedAll()} onChange={handleCheckedAll}></input>,
            translate("Type"),
            translate("Enabled"),
            translate("Action"),
        ]
    })

    return <div className={`flex flex-col h-full ${state.getBackground(state)} text-${state.getTextColour(state)}`} style="max-height: 88vh">
        <div className="flex-auto w-full overflow-y-auto script-table-container" ref={tableContainer}>
            <ResizableTable columns={headers()} className={`script-table border padding-table w-full`} columnSize={scriptTable.columnSize} onColumnSizeChanged={handleColumnSizeChanged}>
                <For each={getItems()}>
                    { (item, i)=> 
                    <tr>
                        <td className="text-center"><input type="checkbox" className="select-none" checked={!!getSelected()[i()]} onChange={(e)=> handleCheckedChange(i())} ></input></td>
                        <td className="overflow-hidden text-ellipsis">{item.Name}</td>
                        <td className="text-center"><input type="checkbox" className="select-none" checked={item.Enabled}></input></td>
                        <td className="text-right">
                            <FlatCircleButton size={8} color={state.getTextColour(state)}>
                                <i class="fa-solid fa-pen-to-square text-green-500"></i>
                            </FlatCircleButton>
                        </td>
                    </tr>
                }
                </For>
            </ResizableTable>
        </div>
        <div className="pb-1">
            <div className="block">
                <ScriptTableNav showDelete={anySelected} onDeleteRequest={handleDeleteRequest} onAddRequest={handleAddItem} />
            </div>
            <div className="grid grid-cols-3">
                <div>             
                </div>
                <div className="col-span-2 block">
                    <ScriptFileBrowser />
                </div>
            </div>
        </div>
    </div>
}