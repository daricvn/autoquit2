import { useGlobalState } from "../../store"

export default function Checkbox(props){
    const [ state, setState ] = useGlobalState()
    return <label className="inline-flex items-center">
        <input type="checkbox" className={`form-checkbox mr-2 w-5 h-5 border rounded text-${state.getAccent(state)} focus:ring-opacity-50 focus:ring-gray-500`}
            checked={!!props.checked}
            onChange={props.onChange}
            disabled={props.disabled} />
        {props.children}
    </label>
}