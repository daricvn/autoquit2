import { createMemo } from "solid-js"
import { useGlobalState } from "../../store"

export default function Content(props){
    const [ state, setState ] = useGlobalState()
    const className = createMemo(()=> (props.className ?? "") + " text-" + state.getTextColour(state))
    return <div className={className()}>{props.children}</div>
}