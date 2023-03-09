import {  createMemo, For, Show, JSX, children } from 'solid-js';
import { useObservatorContext } from '../../context/ObservatorContext';
import { IObservatorFinishCallback } from '../../interfaces/IObservator';
import IRect from '../../models/Rect';
import './ResizablePanel.css';

export interface IResizablePanelProps{
    class?: string;
    style?: string;
    children?: any[];
    columns?: number[];
    rightToLeft?: boolean;
    onSizeChanged?: IObservatorFinishCallback;
}

export const ResizablePanel= (props: IResizablePanelProps)=>{
    const [ observator, setObservator ] = useObservatorContext();
    const handleMouseDown = (e: MouseEvent, i: number)=>{
        const el = e.target as HTMLElement;
        const container = el.parentElement;
        if (container == null) return;
        console.log(container)
        const styles = window.getComputedStyle(container);
        setObservator('index', i);
        setObservator('referencePoint',  { x: e.clientX, w: parseInt(styles.width, 10) });
        setObservator('slider', el);
        setObservator('target', container);
        setObservator('rightToLeft', props.rightToLeft);
        setObservator('finish', props.onSizeChanged);
    }

    const renderedPanel = createMemo(()=>{
        if (!props.children) return ""
        return <For each={props.children}>
            { (col, i) => <td class='select-none' style={ props.columns && props.columns[i()] ? "width: "+ props.columns[i()] + "px": ""}>
                    {col}
                    {
                        <Show when={props.rightToLeft ? i() > 0 : i() < (props.children?.length ?? 0) - 1}>
                            <div class={`resizer ${props.rightToLeft ? 'right': 'left'}`} onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </td>}
        </For>
    })

    return <table class={`resizable-panel ${props.class}`} style={props.style}>
        <tbody>
            <tr>
                {renderedPanel()}
            </tr>
        </tbody>
    </table>
}