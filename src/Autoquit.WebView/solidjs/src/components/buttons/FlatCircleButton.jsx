import { createMemo } from "solid-js";
import { useGlobalState } from "../../store";
import WaveButton from "./WaveButton";

export default function FlatCircleButton(props)
{   
    const size = createMemo(()=> props.size ?? 12)
    return <WaveButton className={`rounded-full outline-none w-${size()} h-${size()} transition-all bg-opacity-0 hover:bg-opacity-5 ${!props.disabled ? '':'opacity-50'} ${props.className}`} color={props.color}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
    </WaveButton>
}