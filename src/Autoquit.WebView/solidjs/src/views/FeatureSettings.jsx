import { createMemo, For } from "solid-js";
import Checkbox from "../components/forms/Checkbox";
import Text from "../components/forms/Text";
import Tooltip from "../components/utilities/Tooltip";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

const features = [
    { key: 'scanThrottle', name: 'Scan throttling', desc: "Improve performance by reducing scan frequency" },
    { key: 'recordMouseMovement', name: 'Trace mouse movement', desc: "Record mouse movement as well" },
    { key: 'scanAll', name: 'Include system processes', desc: "Display system processes in the scan result" },
    { key: 'enableLogging', name: 'Enable Logging', desc: "To detect issues' root cause, enabling logging could help we figure out what happened" },
]

export default function FeatureSettings(props){
    const [state, setState] = useGlobalState()

    const updateSettings = (key, val)=>{
        setState('temporaryState', { ...state.temporaryState, [key]: val });
        if (props.onChange)
            props.onChange()
    }

    const getVal = (key)=>{
        if (state.temporaryState && state.temporaryState[key] != null)
            return state.temporaryState[key]
        return state[key]
    }

    return <div className="flex flex-col space-y-2 pl-6">
        <For each={features}>
            {
                (feature, i)=>
                <div>
                    <Tooltip value={translate(feature.desc)}>
                        <Checkbox onChange={()=> updateSettings(feature.key, !getVal(feature.key))} checked={getVal(feature.key)} >
                            <Text>{translate(feature.name)}</Text>
                        </Checkbox>
                    </Tooltip>
                </div>
            }
        </For>
    </div>
}