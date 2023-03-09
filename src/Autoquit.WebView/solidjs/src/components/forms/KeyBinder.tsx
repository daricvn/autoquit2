import { createSignal, JSX, lazy } from "solid-js";
import IKeyInfo from "../../models/KeyInfo";
import { formatKeyBinding } from "../../presets/KeyMapper";
import TextBox from "./TextBox";

export interface IKeyBinderProps
{
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (key: IKeyInfo)=> void;
}

export default function KeyBinder(props: IKeyBinderProps){
    const [ getValue, setValue ] = createSignal<string | undefined>("")
    const [ getKey, setKey ] = createSignal<IKeyInfo>()

    const handleKeyBind = (event:KeyboardEvent) => {
        let obj = formatKeyBinding(event)
        if (props.readOnly || props.disabled)
            return
        setKey(obj)
        setValue(obj.text)
        if (props.onChange)
            props.onChange(obj)
    }

    return <TextBox class="max-w-sm w-72" append={<i class="far fa-keyboard" />}
            onKeyDown={handleKeyBind}
            value={getValue()}
            readOnly={props.readOnly}
            disabled={props.disabled} />
}