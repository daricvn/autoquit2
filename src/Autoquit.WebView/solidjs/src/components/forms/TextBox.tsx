import { createMemo, JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore";

export interface ITextBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement>{
    append?: Element | any;
    prepend?: Element | any;
}

export default function TextBox(props: ITextBoxProps){
    const [ state, _ ] = useGlobalState()

    const paddingClass = createMemo(()=> {
        let right = !props.append ? 3:10;
        let left = !props.prepend ? 3:10;
        return `pl-${left} pr-${right}`;
    });

    return <div class={`relative text-gray-600 focus-within:text-gray-400 ${props.class}`}>
        {
            !!props.prepend &&
            <span class="absolute text-black inset-y-0 left-0 flex items-center pl-2">
                {props.prepend}
            </span>
        }
        <input type="text" class={`py-2 w-full text-black bg-white rounded-md focus:outline-none focus:shadow-outline focus:ring-transparent ${paddingClass()} border focus:border-${state.getAccent?.call(null, state)}`} placeholder={props.placeholder}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readOnly}
            onClick={props.onClick}
            onDblClick={props.onDblClick}
            style={props.style} />
        {
            !!props.append &&
            <span class="absolute text-black inset-y-0 right-0 flex items-center pr-2">
                {props.append}
            </span>
        }
    </div>
}