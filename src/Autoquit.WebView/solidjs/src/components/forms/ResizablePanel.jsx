import {  createMemo, For, Show } from 'solid-js';
import './ResizablePanel.css';

export const ResizablePanel= (props)=>{
    const handleMouseDown = (e, i)=>{
        const styles = window.getComputedStyle(e.target.parentElement);
        document.resizeIndex = i;
        document.resizeStartW = parseInt(styles.width, 10);
        document.resizeStartX = e.clientX;
        document.resizeTarget = e.target;
        document.resizeIndexCallback = props.onColumnSizeChanged;
        document.resizeRightToLeft = props.rightToLeft;
    }

    const renderedPanel = createMemo(()=>{
        if (!props.children) return ""
        return <For each={props.children}>
            { (col, i) => <td className='select-none' style={ props.columnSize && props.columnSize[i()] ? "width: "+ props.columnSize[i()] + "px": ""}>
                    {col}
                    {
                        <Show when={props.rightToLeft ? i() > 0 : i() < props.children.length - 1}>
                            <div className={`resizer ${props.rightToLeft ? 'right': 'left'}`} onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </td>}
        </For>
    })

    return <table className={`resizable-panel ${props.className}`} style={props.style}>
        <tbody>
            <tr>
                {renderedPanel()}
            </tr>
        </tbody>
    </table>
}