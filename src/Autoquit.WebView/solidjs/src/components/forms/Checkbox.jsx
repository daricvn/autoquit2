import { useGlobalState } from "../../store"

export default function Checkbox(props){
    const [ state, setState ] = useGlobalState()
    return <label className="inline-flex items-center">
        <input type="checkbox" className={`mr-2 w-4 h-4 border rounded text-${state.getAccent(state)}`}
            onChange={props.onChange}
            disabled={props.disabled} />
        {props.children}
    </label>
}