import { createEffect, createMemo, createSignal, For, JSX, lazy, splitProps } from "solid-js"
import './WaveButton.css'

const Ripple = lazy(()=> import("./elements/Ripple"))

export interface IWaveButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    color?: string;
    disabled?: boolean;
}

interface RippleInfo {
    x: number;
    y: number;
    size: number;
}

export default function WaveButton(props: IWaveButtonProps){
    const [ getRipples, setRipples ] = createSignal<RippleInfo[]>([], {
        equals: false
    })
    const [ localProps, others ] = splitProps(props, ['class'])
    let btn: HTMLButtonElement | undefined;
    const onMouseDown = (e: MouseEvent)=>{
        var list = getRipples()
        if (!btn || list.length > 3)
            return
        let rect = btn.getBoundingClientRect()
        let x= e.clientX - rect.left 
        let y= e.clientY - rect.top 
        let size = Math.max(Math.abs(rect.bottom - rect.top), Math.abs(rect.right - rect.left)) * 1.5
        list.push({ x, y, size });
        setRipples(list)
    }

    const removeItem = (index: number)=>{
        var list = getRipples()
        list.splice(index, 1)
        if (list.length == 0)
            setRipples([])
        else
            setRipples(list)
    }

    return <button { ...others } class={localProps.class + " wave-button"} onMouseDown={onMouseDown} disabled={props.disabled} ref={btn}>
        {props.children}
        <For each={getRipples()}>
            {
                (item, i) => <Ripple x={item.x} y={item.y} w={item.size} h={item.size} onTransitionEnd={()=> removeItem(i())} color={props.color ?? 'bg-white'} />
            }
        </For>
    </button>
}