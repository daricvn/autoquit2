import { createMemo, JSX } from "solid-js";
import WaveButton from "./WaveButton";

export interface ICircleButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>
{
    size?: number;
}

export default function CircleButton(props: ICircleButtonProps)
{   
    const size = createMemo(()=> props.size ?? 12)
    return <WaveButton class={`rounded-full outline-none w-${size()} h-${size()} transition-all disabled:shadow-none ${!props.disabled ? '':'opacity-50'} ${props.class}`} color={props.color}
        onClick={props.onClick}>
        {props.children}
    </WaveButton>
}