import { createMemo } from "solid-js";
import Checkbox from "../components/forms/Checkbox";
import Text from "../components/forms/Text";
import Tooltip from "../components/utilities/Tooltip";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

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
        <div>
            <Tooltip value={translate("Improve performance by reducing scan frequency")}>
                <Checkbox onChange={(e)=> updateSettings("scanThrottle", !getVal('scanThrottle'))} checked={getVal('scanThrottle')} >
                    <Text>{translate("Scan throttling")}</Text>
                </Checkbox>
            </Tooltip>
        </div>
        <div>
            <Tooltip value={translate("Record mouse movement as well")}>
                <Checkbox onChange={(e)=> updateSettings("recordMouseMovement", e.checked)} checked={getVal('recordMouseMovement')}>
                    <Text>{translate("Record mouse movement")}</Text>
                </Checkbox>
            </Tooltip>
        </div>
        <div>
            <Tooltip value={translate("Display system processes in the scan result")}>
                <Checkbox onChange={(e)=> updateSettings("scanAll", e.checked)}>
                    <Text>{translate("Include system processes")}</Text>
                </Checkbox>
            </Tooltip>
        </div>
    </div>
}