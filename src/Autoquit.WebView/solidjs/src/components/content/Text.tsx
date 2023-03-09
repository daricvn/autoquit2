import { createMemo, JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"

export interface ITextProps extends JSX.HTMLAttributes<HTMLLabelElement>{
    content?: boolean;
}

export default function Text(props: ITextProps){
    const [ state, setState ] = useGlobalState()
    const className = createMemo(()=> (props.class ?? "") + " text-" + state.getTextColour?.call(null, state))
    if (props.content)
        return <div class={className()}>{props.children}</div>
    return <p class={className()}>{props.children}</p>
}