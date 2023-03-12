import { createEffect, createMemo } from "solid-js";

export interface IRippleProps {
    color?: string;
    w?: number;
    h?: number;
    x?: number;
    y?: number;
    onTransitionEnd?: () => void;
}

export default function Ripple(props: IRippleProps){
    let color = props.color ?? 'bg-white'
    let ripple: HTMLDivElement | undefined;
    let w = props.w ?? 0
    let h = props.h ?? 0
    let x = (props.x ?? 0) - (w / 2)
    let y = (props.y ?? 0) - (h / 2)
    const styles = createMemo(()=> `position: absolute; border-radius: 50%; width: ${w}px; height: ${h}px; top: ${y}px; left: ${x}px;`)
    createEffect(()=>{
        if (!ripple)
            return;
        if (ripple)
            ripple.ontransitionend = ()=>{
                props.onTransitionEnd?.call(null)
            }
        setTimeout(()=>{
            if (ripple)
                ripple.className += " ripple-end"
        }, 10);
    })
    return <div class={/*@once*/`ripple-start pointer-events-none select-none ${color}`} style={styles()} ref={ripple} />
}