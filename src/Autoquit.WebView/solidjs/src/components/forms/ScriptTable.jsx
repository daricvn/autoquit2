import { createEffect, createMemo, createSignal, For } from "solid-js"
import { useScriptContext } from "../../context/ScriptContext"
import translate from "../../libs/i18n"
import { useGlobalState } from "../../store"
import FlatCircleButton from "../buttons/FlatCircleButton"
import ScriptFileBrowser from "../navs/ScriptFileBrowser"
import ScriptTableNav from "../navs/ScriptTableNav"
import { ResizableTable } from "./ResizableTable"
import './ScriptTable.css'

const itemsTest = [ { Name: 1, Desc: 2 }, { Name: 3, Desc: 4 } ]

export const ScriptTable = ()=>{
    const [ getSelected, setSelected ] = createSignal({})
    const [ state, setState ] = useGlobalState()
    const [ scriptTable, setScriptTable ] = useScriptContext()

    const handleColumnSizeChanged = (col, index, width)=>{
        setScriptTable('columnSize', { ...scriptTable.columnSize, [index]: width })
    }

    const handleCheckedChange = (index)=>{
        if (getSelected()[index])
            setSelected({ ...getSelected(), [index]: false});
        else
            setSelected({ ...getSelected(), [index]: true})
    }

    const handleCheckedAll = ()=>{
        let newObj = {}
        const checkedState = !isCheckedAll();
        for ( let i = 0; i < itemsTest.length; i++)
            newObj[i] = checkedState;
        setSelected(newObj)
    }
    
    const isCheckedAll = createMemo(()=> {
        let keys = Object.keys(getSelected())
        if (keys.length != itemsTest.length)
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

    const headers = createMemo(()=>{
        return [
            <input type="checkbox" className="select-none" checked={isCheckedAll()} onChange={handleCheckedAll}></input>,
            translate("Type"),
            translate("Action"),
        ]
    })

    return <div className={`flex flex-col h-full ${state().getBackground(state)} text-${state().getTextColour(state)}`}>
        <div className="flex-auto w-full overflow-y-auto">
            <ResizableTable columns={headers()} className={`border padding-table w-full`} columnSize={scriptTable.columnSize} onColumnSizeChanged={handleColumnSizeChanged}>
                <For each={itemsTest}>
                    { (item, i)=> 
                    <tr>
                        <td className="text-center"><input type="checkbox" className="select-none" checked={!!getSelected()[i()]} onChange={(e)=> handleCheckedChange(i())} ></input></td>
                        <td>{item.Name}</td>
                        <td className="text-right">
                            <FlatCircleButton size={8} color={state().getTextColour(state)}>
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
                <ScriptTableNav showDelete={anySelected} />
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