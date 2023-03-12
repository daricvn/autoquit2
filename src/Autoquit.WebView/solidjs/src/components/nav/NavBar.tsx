import { JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"
import Text from "../content/Text"

export default function NavBar(props: JSX.HTMLAttributes<HTMLButtonElement>){
    const [ state, setState ] = useGlobalState()
    return <div class="flex space-x-3">
        <div>
            <button class={`rounded-full outline-none w-12 h-12 text-${state.getTextColour} bg-${state.getTextColour} bg-opacity-0 hover:bg-opacity-5`} onClick={props.onClick}>
                <i class="fas fa-arrow-left text-xl"></i>
            </button>
        </div>
        <Text class="flex-auto align-text-bottom relative pt-2 text-xl font-bold select-none">
            {props.children}
        </Text>
    </div>
}