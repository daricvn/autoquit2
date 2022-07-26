import {  createMemo, For, Show } from 'solid-js';
import { useGlobalState } from '../../store';
import './ResizableTable.css';

export const ResizableTable= ({ columns, columnSize, className, style, onColumnSizeChanged, children })=>{
    const [ state, setState ] = useGlobalState()

    const handleMouseDown = (e, i)=>{
        const styles = window.getComputedStyle(e.target.parentElement);
        document.resizeIndex = i;
        document.resizeStartW = parseInt(styles.width, 10);
        document.resizeStartX = e.clientX;
        document.resizeTarget = e.target;
        document.resizeIndexCallback = onColumnSizeChanged;
        document.resizeRightToLeft = false;
    }

    const headers = createMemo(()=>{
        if (!columns) return ""
        return <For each={columns}>
            { (col, i) => <th className={`select-none ${state().getBackground(state)}`} style={ columnSize && columnSize[i()] ? "width: "+ columnSize[i()] + "px": ""}>
                    {col}
                    {
                        <Show when={i() < columns.length - 1}>
                            <div className="resizer" onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </th>}
        </For>
    })

    return <table className={`resizable-table ${className}`} style={style}>
        <thead>
            <tr>
                { headers() }
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
}