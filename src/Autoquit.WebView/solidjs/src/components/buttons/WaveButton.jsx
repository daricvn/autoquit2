import { createEffect, createMemo, createSignal, For, splitProps } from "solid-js"
import './WaveButton.css'

const Ripple = (props)=>{
    let color = props.color ?? 'white'
    let ripple
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
            if (props.cleanup)
                props.cleanup()
        }, 310);
    })
    return <div class="ripple-start" style={styles()} ref={ripple} />
}

export default function WaveButton(props){
    let targetButton 
    const [ getRipples, setRipples ] = createSignal([])
    const [ localProps, others ] = splitProps(props, ['className'])

    createEffect(()=>{
        if (targetButton != null)
        {
            targetButton.addEventListener('mousedown', onMouseDown)
        }
    })
    
    const onMouseDown = (e)=>{
        var list = getRipples()
        let rect = targetButton.getBoundingClientRect()
        let x= e.clientX - rect.left 
        let y= e.clientY - rect.top 
        let size = Math.max(Math.abs(rect.bottom - rect.top), Math.abs(rect.right - rect.left)) * 1.5
        setRipples([ ...list, { x, y, size } ])
    }

    const removeItem = (index)=>{
        var list = getRipples()
        list.splice(index, 1)
        if (list.length == 0)
            setRipples([])
        else
            setRipples(list)
    }

    return <button { ...others } className={localProps.className + " wave-button"} ref={targetButton}>
        {props.children}
        <For each={getRipples()}>
            {
                (item, i) => <Ripple x={item.x} y={item.y} w={item.size} h={item.size} cleanup={()=> removeItem(i)} color={props.color} />
            }
        </For>
    </button>
}