import { useGlobalState } from "../../store";
import WaveButton from "../buttons/WaveButton";
import Text from "../forms/Text";

export default function NavTitle(props){
    const [ state, setState ] = useGlobalState()
    return <div className="flex space-x-3">
        <div>
            <WaveButton className={`rounded-full outline-none w-12 h-12 text-${state.getTextColour(state)} bg-${state.getTextColour(state)} transition-all bg-opacity-0 hover:bg-opacity-5`} color={state.getTextColour(state)}
                onClick={props.onClick}>
                <i className="fas fa-arrow-left text-xl"></i>
            </WaveButton>
        </div>
        <Text className="flex-auto align-text-bottom relative pt-2 text-xl font-bold select-none">
            {props.children}
        </Text>
    </div>
}