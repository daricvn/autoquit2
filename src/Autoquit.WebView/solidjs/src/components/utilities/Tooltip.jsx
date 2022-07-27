import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from 'solid-js';
import createDebounce from '../../libs/createDebounce';
import { Transition } from 'solid-transition-group';
import { useGlobalState } from '../../store';
import './Tooltip.css'

export default function Tooltip({ offset, position, disabled, className, children, value, style }){
    const [ state, setState ] = useGlobalState()
    const _debounce = createDebounce()
    const [ getHover, setHover ] = createSignal(false)
    const [ getStyle, setStyle ] = createSignal("")
    const [ getMounted, setMounted ] = createSignal(false)
    let reference;

    onMount(()=>{
        setTimeout(()=> setMounted(true), 600);
    })

    onCleanup(()=>{
        setMounted(false)
    })

    createEffect(()=>{
        getHover()
        if (!reference)
            return
        let fx = +(offset ?? 4)
        let rect = reference.getBoundingClientRect()
        let x = Math.round(reference.offsetLeft + (rect.width/2))
        let y = Math.round(reference.offsetTop + (rect.height/2))
        if (position == "top")
            y -= Math.round(rect.height/2 + fx)
        else if (position == "left")
            x -= Math.round(rect.width/2 + fx)
        else if (position == "right")
            x += Math.round(rect.width/2 + fx)
        else
            y += (fx + rect.height / 2)
        setStyle(`top: ${y}px; left: ${x}px; ${style ?? ""}`)
    })

    const handleMouseHover = ()=>{
        if (!disabled)
            setHover(true)  
    }

    const handleMouseOut = ()=>{
        _debounce(()=> {
            setHover(false)
        }, 60);
    }

    const transition = createMemo(()=> 
    {   
        switch (position)
        {
            case "left":
                return "-translate-y-1/2 -translate-x-full";
            case "right":
                return "-translate-y-1/2";
            case "top":
                return "-translate-x-1/2 -translate-y-full";
            default:
                return "-translate-x-1/2"
        }
    })

    return <div className={`inline-block ${className ?? ""}`}>
        <Transition name="tooltip">
            <Show when={getHover()}>
                <div className={`absolute select-none pointer-events-none tooltip font-thin text-sm inline-block px-3 py-1 rounded-lg transform ${state.getBackgroundInvert(state)} bg-opacity-80 text-${state.getTextColourInvert(state)} ${transition()}`} style={getStyle()}>
                    { value }
                </div>
            </Show>
        </Transition>
        <div ref={reference} onMouseOver={handleMouseHover} onMouseLeave={handleMouseOut}>
            { children }
        </div>
    </div>
}