import { createMemo, JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"

export interface IColourProps extends JSX.HTMLAttributes<HTMLDivElement>
{
    color?: string;
    selected?: boolean;
}

export default function ColourItem(props: IColourProps){
    const [ state, _ ] = useGlobalState()

    const classState = createMemo(()=> props.selected ? "/50" : "/25 bg-opacity-80 hover:bg-opacity-60")

    return <div class={`rounded-full w-10 h-10 border-4 transition-all border-${state.getTextColour?.call(null, state)}${classState()} bg-${props.color}`} onClick={props.onClick}>

    </div>
}