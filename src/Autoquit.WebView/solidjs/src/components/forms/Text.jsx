import { createMemo } from "solid-js"
import { useGlobalState } from "../../store"

export default function Text(props){
    const [ state, setState ] = useGlobalState()
    const className = createMemo(()=> (props.className ?? "") + " text-" + state.getTextColour(state))
    if (props.content)
        return <div className={className()}>{props.children}</div>
    return <p className={className()}>{props.children}</p>
}