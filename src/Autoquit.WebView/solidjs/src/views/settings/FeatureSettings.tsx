import { createMemo, For } from "solid-js";
import { Part } from "solid-js/store";
import Text from "../../components/content/Text";
import Checkbox from "../../components/forms/Checkbox";
import Tooltip from "../../components/tooltip/Tooltip";
import { useGlobalState } from "../../context/GlobalStore";
import { IVoid } from "../../interfaces/ICommon";
import { IGlobalStore } from "../../interfaces/IGlobalStore";
import translate from "../../localization/translate";
import { featurePresets } from "../../presets/FeaturePresets";

export interface IFeatureSettingsProps {
    onChange: IVoid
}

export default function FeatureSettings(props: IFeatureSettingsProps){
    const [state, setState] = useGlobalState()

    const updateSettings = (key: Part<IGlobalStore>, val: any)=>{
        setState('temporaryState', key, val);
        if (props.onChange)
            props.onChange()
    }

    const getVal = (key: string)=>{
        if (state.temporaryState && (state.temporaryState as any)[key] != null)
            return (state.temporaryState as any)[key]
        return (state as any)[key]
    }

    return <div class="flex flex-col space-y-2 pl-6">
        <For each={featurePresets}>
            {
                (feature, i)=>
                <div>
                    <Tooltip value={translate(feature.desc)}>
                        <Checkbox onChange={()=> updateSettings(feature.key, !getVal(feature.key.toString()))} checked={getVal(feature.key.toString())} >
                            <Text>{translate(feature.name)}</Text>
                        </Checkbox>
                    </Tooltip>
                </div>
            }
        </For>
    </div>
}