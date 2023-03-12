import {  createMemo, For, Show } from 'solid-js';
import { useGlobalState } from '../../context/GlobalStore';
import { useObservatorContext } from '../../context/ObservatorContext';
import { IObservatorFinishCallback } from '../../interfaces/IObservator';
import './ResizableTable.css';

export interface IResizableTableProps{
    class?: string;
    style?: string;
    children?: any;
    columns?: number[];
    minColumns?: number[];
    items?: any[];
    rightToLeft?: boolean;
    onSizeChanged?: IObservatorFinishCallback;
}

const buildColumnStyle = (defaultW: number, minW: number)=>{
    return `min-width: ${minW}px` + (defaultW > 0 ? `;width:${defaultW}px` : '');
}

export const ResizableTable= (props: IResizableTableProps)=>{
    const [ state, setState ] = useGlobalState()
    const [ observator, setObservator ] = useObservatorContext();

    const handleMouseDown = (e: MouseEvent, i: number)=>{
        let el = e.target as Element;
        let container = el.parentElement as HTMLElement;
        const styles = window.getComputedStyle(container);
        setObservator('index', i)
        setObservator('rightToLeft', false)
        setObservator('slider', el)
        setObservator('target', container)
        setObservator('referencePoint', { x: e.clientX, w: parseInt(styles.width, 10) })
        setObservator('finish', props.onSizeChanged)
    }

    const headers = createMemo(()=>{
        if (!props.items) return ""
        return <For each={props.items}>
            { (col, i) => <th class={`select-none ${state.getBackground}`} style={buildColumnStyle(props.columns![i()], props.minColumns ? props.minColumns[i()]:0)}>
                    {col}
                    {
                        <Show when={i() < (props.items?.length ?? 0) - 1}>
                            <div class="resizer" onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </th>}
        </For>
    })

    return <table class={`resizable-table ${props.class}`} style={props.style}>
        <thead>
            <tr>
                { headers() }
            </tr>
        </thead>
        <tbody>
            {props.children}
        </tbody>
    </table>
}