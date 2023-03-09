import { createMemo, JSX } from "solid-js";
import WaveButton from "./WaveButton";

export interface FlatCircleButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    size?: number;
    disabled?: boolean;
}

export default function FlatCircleButton(props: FlatCircleButtonProps)
{   
    const size = createMemo(()=> props.size ?? 12)
    return <WaveButton class={`rounded-full outline-none w-${size()} h-${size()} transition-all bg-opacity-0 hover:bg-opacity-5 ${!props.disabled ? '':'opacity-50'} ${props.class}`} color={props.color}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
    </WaveButton>
}