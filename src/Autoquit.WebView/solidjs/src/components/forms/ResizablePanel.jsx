import {  createMemo, For, Show } from 'solid-js';
import './ResizablePanel.css';

export const ResizablePanel= ({ columnSize, className, style, onColumnSizeChanged, children, rightToLeft })=>{

    const handleMouseDown = (e, i)=>{
        const styles = window.getComputedStyle(e.target.parentElement);
        document.resizeIndex = i;
        document.resizeStartW = parseInt(styles.width, 10);
        document.resizeStartX = e.clientX;
        document.resizeTarget = e.target;
        document.resizeIndexCallback = onColumnSizeChanged;
        document.resizeRightToLeft = rightToLeft;
    }

    const renderedPanel = createMemo(()=>{
        if (!children) return ""
        return <For each={children}>
            { (col, i) => <td className='select-none' style={ columnSize && columnSize[i()] ? "width: "+ columnSize[i()] + "px": ""}>
                    {col}
                    {
                        <Show when={rightToLeft ? i() > 0 : i() < children.length - 1}>
                            <div className={`resizer ${rightToLeft ? 'right': 'left'}`} onMouseDown={(e)=>handleMouseDown(e, i())} />
                        </Show>
                    }
                </td>}
        </For>
    })

    return <table className={`resizable-panel ${className}`} style={style}>
        <tbody>
            <tr>
                {renderedPanel()}
            </tr>
        </tbody>
    </table>
}