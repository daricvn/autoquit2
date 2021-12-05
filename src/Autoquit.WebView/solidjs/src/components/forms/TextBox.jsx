import { createMemo } from "solid-js"
import { useGlobalState } from "../../store";

export default function TextBox(props){
    const [ state, setState ] = useGlobalState()

    const paddingClass = createMemo(()=> {
        let right = !props.iconAfter ? 3:10;
        let left = !props.iconBefore ? 3:10;
        return `pl-${left} pr-${right}`;
    });

    return <div class={`relative text-gray-600 focus-within:text-gray-400 ${props.className}`}>
        {
            !!props.iconBefore &&
            <span class="absolute text-black inset-y-0 left-0 flex items-center pl-2">
                {props.iconBefore}
            </span>
        }
        <input type="text" class={`py-2 w-full text-black bg-white rounded-md focus:outline-none focus:shadow-outline ${paddingClass()} border focus:border-${state.getAccent(state)}`} placeholder={props.placeholder}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readOnly}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            style={props.style} />
        {
            !!props.iconAfter &&
            <span class="absolute text-black inset-y-0 right-0 flex items-center pr-2">
                {props.iconAfter}
            </span>
        }
    </div>
}