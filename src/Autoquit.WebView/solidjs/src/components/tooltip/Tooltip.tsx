import { createEffect, createMemo, createSignal, JSX, onCleanup, onMount, Setter, Show } from 'solid-js';
import { debounce } from '@solid-primitives/scheduled'
import { Transition } from 'solid-transition-group';
import './Tooltip.css'
import { useGlobalState } from '../../context/GlobalStore';

export interface ITooltipProps extends JSX.HTMLAttributes<HTMLInputElement>{
    offset?: number;
    value?: string;
    disabled?: boolean;
    position?: 'top' | 'left' | 'right' | 'bottom'
}

export default function Tooltip(props: ITooltipProps){
    //const { offset, position, disabled, className, children, value, style } = props
    const [ state, setState ] = useGlobalState()
    const debounceHover = debounce((setter: Setter<boolean>, val: boolean)=> setter(val), 80)
    const [ getHover, setHover ] = createSignal(false)
    let reference: HTMLDivElement | undefined;

    const tooltipStyle = createMemo(()=>{
        getHover()
        if (!reference)
            return ''
        let fx = +(props.offset ?? 4)
        let rect = reference.getBoundingClientRect()
        let x = Math.round(reference.offsetLeft + (rect.width/2))
        let y = Math.round(reference.offsetTop + (rect.height/2))
        if (props.position == "top")
            y -= Math.round(rect.height/2 + fx)
        else if (props.position == "left")
            x -= Math.round(rect.width/2 + fx)
        else if (props.position == "right")
            x += Math.round(rect.width/2 + fx)
        else
            y += (fx + rect.height / 2)
        return `top: ${y}px; left: ${x}px; ${props.style ?? ""}`
    })

    const handleMouseHover = ()=>{
        if (!props.disabled)
            setHover(true)  
    }

    const handleMouseOut = ()=>{
        debounceHover(setHover, false);
    }

    const transition = createMemo(()=> 
    {   
        switch (props.position)
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

    return <div class={`inline-block ${props.class ?? ""}`}>
        <Transition name="tooltip">
            <Show when={getHover()}>
                <div class={`absolute select-none pointer-events-none tooltip font-thin text-sm inline-block px-3 py-1 rounded-lg transform ${state.getBackgroundInvert} bg-opacity-80 text-${state.getTextColourInvert} ${transition()}`} style={tooltipStyle()}>
                    { props.value }
                </div>
            </Show>
        </Transition>
        <div ref={reference} onMouseOver={handleMouseHover} onMouseLeave={handleMouseOut}>
            { props.children }
        </div>
    </div>
}