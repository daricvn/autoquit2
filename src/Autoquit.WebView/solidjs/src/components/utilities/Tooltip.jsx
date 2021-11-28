import { createEffect, createMemo, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { useGlobalState } from '../../store';
import './Tooltip.css'

export default function Tooltip(props){
    const [ state, setState ] = useGlobalState()
    const [ getHover, setHover ] = createSignal(false)
    const [ getStyle, setStyle ] = createSignal("")
    let reference;

    createEffect(()=>{
        if (!reference || !state.size?.width)
            return
        let offset = +(props.offset ?? 4)
        let rect = reference.getBoundingClientRect()
        console.log(reference.offsetLeft)
        let x = Math.round(reference.offsetLeft + (rect.width/2))
        let y = Math.round(reference.offsetTop + (rect.height/2))
        if (props.position == "top")
            y -= Math.round(rect.height/2 + offset)
        else if (props.position == "left")
            x -= Math.round(rect.width/2 + offset)
        else if (props.position == "right")
            x += Math.round(rect.width/2 + offset)
        else
            y += (offset + rect.height / 2)
        setStyle(`top: ${y}px; left: ${x}px`)
    })

    const handleMouseHover = ()=>{
        if (!props.disabled)
            setHover(true)  
    }

    const handleMouseOut = ()=>{
        setHover(false)
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

    return <div className={`inline-block ${props.className ?? ""}`}>
        <Transition name="tooltip">
            {
                getHover() &&
                <div className={`tooltip font-thin text-sm inline-block px-3 py-1 rounded-lg transform ${state.getBackgroundInvert(state)} bg-opacity-80 text-${state.getTextColourInvert(state)} ${transition()}`} style={getStyle()}>
                    { props.value }
                </div>
            }
        </Transition>
        <div ref={reference} onMouseOver={handleMouseHover} onMouseLeave={handleMouseOut}>
            { props.children }
        </div>
    </div>
}