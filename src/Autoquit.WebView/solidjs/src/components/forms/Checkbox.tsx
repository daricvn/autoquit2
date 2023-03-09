import { JSX } from 'solid-js'
import { useGlobalState } from "../../context/GlobalStore"

export interface ICheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement>{

}

export default function Checkbox(props: ICheckboxProps){
    const [ state, setState ] = useGlobalState()
    return <label class="inline-flex items-center">
        <input type="checkbox" class={`form-checkbox mr-2 w-5 h-5 border rounded text-${state.getAccent?.call(null,state)} focus:ring-opacity-50 focus:ring-gray-500`}
            checked={!!props.checked}
            onChange={props.onChange}
            disabled={props.disabled} />
        {props.children}
    </label>
}