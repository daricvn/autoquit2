import { useGlobalState } from "../../store";
import WaveButton from "../buttons/WaveButton";

export default function NavTitle(props){
    const [ state, setState ] = useGlobalState()
    return <div className="flex space-x-3">
        <div>
            <WaveButton className={`rounded-full w-12 h-12 text-${state.getTextColour(state)}`} color={state.getTextColour(state)}
                onClick={props.onClick}>
                <i className="fas fa-arrow-left text-xl"></i>
            </WaveButton>
        </div>
        <div className={`flex-auto align-text-bottom relative pt-2 text-lg font-bold text-${state.getTextColour(state)}`}>
            {props.children}
        </div>
    </div>
}