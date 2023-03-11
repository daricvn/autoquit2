import { JSX, lazy } from 'solid-js'
import { useGlobalState } from "../../context/GlobalStore"

const CircularProgress = lazy(()=> import("../progress/CircularProgress"))
export interface IDropdownIndicatorProps extends JSX.HTMLAttributes<HTMLLabelElement> {
    loading?: boolean;
    open?: boolean;
    disabled?: boolean;
}

export default function DropdownIndicator(props: IDropdownIndicatorProps){
    const [ state, _] = useGlobalState();
    const getOpenIndicatorClass = ()=>{
        if (props.open)
            return "transform-gpu"
        return "transform-gpu rotate-180"
    }
    
    if (!props.loading)
        return <label for="show_more" class={`${props.disabled ?? 'cursor-pointer hover:text-gray-600'} outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 ${getOpenIndicatorClass()}`} onClick={props.onClick}>
                <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </label>
    return <CircularProgress color={state.getAccent?.call(null, state, 'base')} size={6} class="mx-2" />
}