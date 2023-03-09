import { createMemo, JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"

export default function Content(props: JSX.HTMLAttributes<HTMLDivElement>){
    const [ state, setState ] = useGlobalState()
    const className = createMemo(()=> (props.class ?? "") + " text-" + state.getTextColour?.call(null, state))
    return <div class={className()} onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}>{props.children}</div>
}