import { createMemo } from "solid-js"
import './DropdownItem.css'

export default function DropdownItem(props) {

    const renderText = createMemo(()=>{
        if (!props.highlight) return props.value;
        const idx = props.value.toLowerCase().indexOf(props.highlight.toLowerCase())
        if (idx <0) return props.value
        return <>
            {props.value.substr(0, idx)}<span className="highlighted">{props.value.substr(idx, props.highlight.length)}</span>{props.value.substr(idx + props.highlight.length)}
        </>
    })

    return <div className="flex-auto overflow-hidden">{ renderText() }</div>
}