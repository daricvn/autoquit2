import { createMemo, createSignal } from "solid-js";
import Text from "../../components/content/Text";
import Slider from "../../components/forms/Slider";
import { useGlobalState } from "../../context/GlobalStore";
import translate from "../../localization/translate";
import { AppState } from "../../models/AppState";
import RepeatOptions from "./RepeatOptions";

const DEFAULT_SPEED = 100

export default function PlaybackOptions()
{
    const [ state, setState ] = useGlobalState()

    const handleChange = (e: any)=>{
        setState('playbackOptions', 'speed', e.target.value)
    }

    const getSpeed = createMemo(()=> state.playbackOptions?.speed ?? DEFAULT_SPEED)

    const isBusy = createMemo(()=> state.appState == AppState.Playback || state.appState == AppState.Recording)

    return <div class="flex flex-col pr-1 pt-2 gap-1">
        <Text content>
            {translate("Playback Speed")}:
        </Text>
        <div>
            <Slider class="h-6" min={0} max={300} step={25} lockBefore={25} value={getSpeed()} onChange={handleChange} disabled={isBusy()}>
                <Text class="text-xs pt-0.5" content invert>
                    {getSpeed()}%
                </Text>
            </Slider>
        </div>
        <Text class="mt-4" content>
            <RepeatOptions disabled={isBusy()} />
        </Text>
    </div>
}