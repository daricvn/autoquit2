import { createMemo } from "solid-js"
import './DropdownItem.css'

export interface IDropdownItemProps {
    value: any;
    highlight?: string;
}

export default function DropdownItem(props: IDropdownItemProps) {

    const renderText = createMemo(()=>{
        if (!props.highlight) return props.value;
        const idx = props.value.toLowerCase().indexOf(props.highlight.toLowerCase())
        if (idx <0) return props.value
        return <>
            {props.value.substr(0, idx)}<span class="highlighted">{props.value.substr(idx, props.highlight.length)}</span>{props.value.substr(idx + props.highlight.length)}
        </>
    })

    return <div class="flex-auto overflow-hidden">{ renderText() }</div>
}