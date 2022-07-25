import { createMemo, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../store"
import CircleButton from "../buttons/CircleButton"

export default function ScriptTableNav({ showDelete, onDeleteRequest }){
    const [ state, setState ] = useGlobalState()

    const handleDeleteRequest = ()=>{
        if (onDeleteRequest)
            onDeleteRequest()
    }

    const shouldShowDelete = createMemo(()=>{
        if (showDelete === undefined)
            return false;
        if (typeof(showDelete) === 'function')
            return showDelete()
        return showDelete
    })
    
    return <div className="px-3 pt-2 block">
        <CircleButton className="bg-green-500 text-white shadow-sm shadow-green-500/50 hover:shadow-md mr-1" size={8} color={state().getTextColourInvert(state)}>
            <i class="fa-solid fa-plus"></i>
        </CircleButton>
        <Transition name="appear">
            <Show when={shouldShowDelete()}>
                <CircleButton className="bg-red-500 text-white shadow-sm shadow-red-500/50 hover:shadow-md" size={8} color={state().getTextColourInvert(state)}
                    onClick={handleDeleteRequest}>
                    <i class="fa-solid fa-trash-can"></i>
                </CircleButton>
            </Show>
        </Transition>
    </div>
}