import { createMemo, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../store"
import CircleButton from "../buttons/CircleButton"

export default function ScriptTableNav(props){
    const [ state, setState ] = useGlobalState()

    const handleDeleteRequest = ()=>{
        console.log("Hello")
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
        if (typeof(props.showDelete) === 'function')
            return props.showDelete()
        return props.showDelete
    })
    
    return <div className="px-3 pt-2 block">
        <CircleButton className="bg-green-500 text-white shadow-sm shadow-green-500/50 hover:shadow-md mr-1" size={8} color={state.getTextColourInvert(state)}
            onClick={handleAddRequest}>
            <i class="fa-solid fa-plus"></i>
        </CircleButton>
        <Transition name="appear">
            <Show when={shouldShowDelete()}>
                <CircleButton className="bg-red-500 text-white shadow-sm shadow-red-500/50 hover:shadow-md" size={8} color={state.getTextColourInvert(state)}
                    onClick={handleDeleteRequest}>
                    <i class="fa-solid fa-trash-can"></i>
                </CircleButton>
            </Show>
        </Transition>
    </div>
}