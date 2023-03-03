import {  createMemo, For, Show } from 'solid-js';
import { useGlobalState } from '../../store';
import './ResizableTable.css';

export const ResizableTable= (props)=>{
    const [ state, setState ] = useGlobalState()

    const handleMouseDown = (e, i)=>{
        const styles = window.getComputedStyle(e.target.parentElement);
        document.resizeIndex = i;
        document.resizeStartW = parseInt(styles.width, 10);
        document.resizeStartX = e.clientX;
        document.resizeTarget = e.target;
        document.resizeIndexCallback = props.onColumnSizeChanged;
        document.resizeRightToLeft = false;
    }

    const headers = createMemo(()=>{
        if (!props.columns) return ""
        return <For each={props.columns}>
            { (col, i) => <th className={`select-none ${state.getBackground(state)}`} style={ props.columnSize && props.columnSize[i()] ? "width: "+ props.columnSize[i()] + "px": ""}>
                    {col}
                    {
                        <Show when={i() < props.columns.length - 1}>
                            <div className="resizer" onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </th>}
        </For>
    })

    return <table className={`resizable-table ${props.className}`} style={props.style}>
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