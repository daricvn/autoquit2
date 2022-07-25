import { createMemo } from "solid-js";
import WaveButton from "./WaveButton";

export default function CircleButton(props)
{   
    const size = createMemo(()=> props.size ?? 12)
    return <WaveButton className={`rounded-full outline-none w-${size()} h-${size()} transition-all disabled:shadow-none ${!props.disabled ? '':'opacity-50'} ${props.className}`} color={props.color}
        onClick={props.onClick}>
        {props.children}
    </WaveButton>
}