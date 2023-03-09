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
    let color = props.color ?? 'white'
    let ripple: HTMLDivElement | any;
    let w = props.w ?? 0
    let h = props.h ?? 0
    let x = (props.x ?? 0) - (w / 2)
    let y = (props.y ?? 0) - (h / 2)
    const styles = createMemo(()=> `position: absolute; background-color: ${color}; border-radius: 50%; width: ${w}px; height: ${h}px; top: ${y}px; left: ${x}px;`)
    createEffect(()=>{
        if (!ripple)
            return;
        setTimeout(()=>{
            ripple.className += " ripple-end"
        }, 10);
        setTimeout(()=>{
            props.onTransitionEnd?.call(null)
        }, 310);
    })
    return <div class="ripple-start pointer-events-none	select-none" style={styles()} ref={ripple} />
}