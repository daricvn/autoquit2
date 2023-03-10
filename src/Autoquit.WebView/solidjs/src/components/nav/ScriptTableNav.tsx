import { createMemo, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../context/GlobalStore"
import { IVoid } from "../../interfaces/ICommon"
import CircleButton from "../buttons/CircleButton"

export interface IScriptTableNav {
    onDeleteRequest?: IVoid;
    onAddRequest?: IVoid;
    showDelete?: boolean;
}

export default function ScriptTableNav(props: IScriptTableNav){
    const [ state, setState ] = useGlobalState()

    const handleDeleteRequest = ()=>{
        if (props.onDeleteRequest)
        props.onDeleteRequest()
    }

    const handleAddRequest = ()=>{
        if (props.onAddRequest)
        props.onAddRequest()
    }

    const shouldShowDelete = createMemo(()=>{
        if (props.showDelete === undefined)
            return false;
        return props.showDelete
    })
    
    return <div class="px-3 pt-2 block">
        <CircleButton class="bg-green-500 text-white shadow-sm shadow-green-500/50 hover:shadow-md mr-1" size={8} color={"bg-" + state.getTextColourInvert?.call(null, state)}
            onClick={handleAddRequest}>
            <i class="fa-solid fa-plus"></i>
        </CircleButton>
        <Transition name="appear">
            <Show when={shouldShowDelete()}>
                <CircleButton class="bg-red-500 text-white shadow-sm shadow-red-500/50 hover:shadow-md" size={8} color={"bg-" + state.getTextColourInvert?.call(null, state)}
                    onClick={handleDeleteRequest}>
                    <i class="fa-solid fa-trash-can"></i>
                </CircleButton>
            </Show>
        </Transition>
    </div>
}