import { useGlobalState } from "../../store";
import FlatCircleButton from "../buttons/FlatCircleButton";
import WaveButton from "../buttons/WaveButton";
import Text from "../forms/Text";

export default function NavTitle(props){
    const [ state, setState ] = useGlobalState()
    return <div className="flex space-x-3">
        <div>
            <button className={`rounded-full outline-none w-12 h-12 text-${state.getTextColour(state)} bg-${state.getTextColour(state)} bg-opacity-0 hover:bg-opacity-5`} onClick={props.onClick} color={state.getTextColour(state)}>
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
        </div>
        <Text className="flex-auto align-text-bottom relative pt-2 text-xl font-bold select-none">
            {props.children}
        </Text>
    </div>
}