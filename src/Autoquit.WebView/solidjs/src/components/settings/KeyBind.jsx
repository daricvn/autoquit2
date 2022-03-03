import { createSignal } from "solid-js";
import { routes } from "../../routes/config";
import TextBox from "../forms/TextBox";

const refineDisplayKeyCode = (keyCode)=>{
    if (keyCode.startsWith("Key"))
        return keyCode.substring(3);
    if (keyCode.startsWith("Digit"))
        return keyCode.substring(5);
    if (keyCode == 'Backquote')
        return '`';
    if (keyCode == 'Minus')
        return '-';
    if (keyCode == 'Equal')
        return '=';
    if (keyCode == 'Backslash')
        return '\\';
    if (keyCode == 'Quote')
        return '\'';
    if (keyCode == 'Semicolon')
        return ';';
    if (keyCode == 'Slash')
        return '/';
    if (keyCode == 'Period')
        return '.';
    if (keyCode == 'Comma')
        return ',';
    if (keyCode == 'BracketLeft')
        return '[';
    if (keyCode == 'BracketRight')
        return ']';
    return keyCode;
}

const processKeyBind = (event) => {
    event.preventDefault()
    let obj = {}
    obj.key = event.code
    obj.alt = event.altKey
    obj.ctrl = event.ctrlKey
    obj.shift = event.shiftKey
    obj.text = ''
    if (obj.key == "Escape" && !obj.ctrl && !obj.alt)
        return obj;
    if (!obj.key.startsWith("Control") && obj.ctrl)
        obj.text += "[CTRL]";
    if (!obj.key.startsWith("Alt") && obj.alt)
        obj.text += (obj.text ? '+':'') + "[ALT]";
    if (!obj.key.startsWith("Shift") && obj.shift)
        obj.text += (obj.text ? '+':'') + "[SHIFT]";
    obj.text += (obj.text ? '+':'') + refineDisplayKeyCode(obj.key);
    return obj
}

export default function KeyBind(props){
    const [ getValue, setValue ] = createSignal("")
    const [ getKey, setKey ] = createSignal({})

    const handleKeyBind = (event) => {
        let obj = processKeyBind(event)
        if (props.readOnly || props.disabled)
            return
        setKey(obj)
        setValue(obj.text)
        if (props.onChange)
            props.onChange(obj)
    }

    return <TextBox className="max-w-sm w-72" append={<i className="far fa-keyboard" />}
            onKeyDown={handleKeyBind}
            value={getValue()}
            readOnly={props.readOnly}
            disabled={props.disabled} />
}