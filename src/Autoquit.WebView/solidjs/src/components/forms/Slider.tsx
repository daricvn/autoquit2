import { createEffect, createMemo, createSignal, JSX, Show } from 'solid-js'
import { useGlobalState } from '../../context/GlobalStore';

export interface ISliderProps extends JSX.InputHTMLAttributes<HTMLInputElement>
{
    lockBefore?: number;
}

export default function Slider(props: ISliderProps)
{
    const [ getValue, setValue ] = createSignal<number | string>(+((props.value ?? props.lockBefore) ?? 0))
    const [ state, _]   = useGlobalState()

    const handleChange = (e: any)=>{
        if (props.disabled || getValue() == e.target.value) return;
        if (props.lockBefore && +e.target.value < props.lockBefore)
            e.target.value = props.lockBefore;
        setValue(+(e.target.value));
        (props.onChange as any)(null, e);
    }

    const percent = createMemo(()=> {
        const range = +(props.max ?? 0) - +(props.min ?? 0);
        const val = +getValue() - +(props.min ?? 0)
        if (range == 0) return 0;
        return val * 100 / range;
    })

    const accentColor = createMemo(()=>(props.disabled ? 'bg-gray-400' :`bg-${state.getAccent}`))

    return <div class={`relative w-full bg-neutral-200 min-h-2 ${props.class}`}>
        <input
        type="range"
        class="transparent opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer appearance-none -mb-2 border-transparent"
        min={props.min}
        max={props.max}
        step={props.step}
        value={getValue()}
        onMouseMove={handleChange}
        onChange={handleChange}
        />
        <div class={`top-0 left-0 h-full absolute ${accentColor()} pointer-events-none ease-in-out duration-100 overflow-hidden text-center`} style={`width: ${percent()}%`}>
            {props.children}
        </div>
    </div>
}