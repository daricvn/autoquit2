import { createMemo, JSX, splitProps } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore";

export interface ITextBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement>{
    append?: Element | any;
    prepend?: Element | any;
}

export default function TextBox(props: ITextBoxProps){
    const [ state, _ ] = useGlobalState()
    const [ localProps, otherProps ] = splitProps(props, [ 'type', 'append', 'prepend', 'class' ]);

    const paddingClass = createMemo(()=> {
        let right = !localProps.append ? 3:10;
        let left = !localProps.prepend ? 3:10;
        return `pl-${left} pr-${right}`;
    });

    return <div class={`relative text-gray-600 focus-within:text-gray-400 ${localProps.class}`}>
        {
            !!localProps.prepend &&
            <span class="absolute text-black inset-y-0 left-0 flex items-center pl-2">
                {localProps.prepend}
            </span>
        }
        <input type={localProps.type ?? "text"} class={`py-2 w-full text-black bg-white rounded-md focus:outline-none focus:shadow-outline focus:ring-transparent ${paddingClass()} border focus:border-${state.getAccent}`} 
           {...otherProps} />
        {
            !!localProps.append &&
            <span class="absolute text-black inset-y-0 right-0 flex items-center pr-2">
                {localProps.append}
            </span>
        }
    </div>
}