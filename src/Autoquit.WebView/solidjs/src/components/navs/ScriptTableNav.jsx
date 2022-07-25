import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../store"
import CircleButton from "../buttons/CircleButton"

export default function ScriptTableNav({ showDelete, onDeleteRequest }){
    const [ state, setState ] = useGlobalState()

    const handleDeleteRequest = ()=>{
        if (onDeleteRequest)
            onDeleteRequest()
    }
    return <div className="px-3 py-2 block">
        <CircleButton className="bg-green-500 text-white shadow-sm shadow-green-500/50 hover:shadow-md mr-1" size={8} color={state().getTextColourInvert(state)}>
            <i class="fa-solid fa-plus"></i>
        </CircleButton>
        <Transition name="appear">
            {   
                showDelete && <CircleButton className="bg-red-500 text-white shadow-sm shadow-red-500/50 hover:shadow-md" size={8} color={state().getTextColourInvert(state)}>
                    <i class="fa-solid fa-trash-can"></i>
                </CircleButton>
            }
        </Transition>
    </div>
}