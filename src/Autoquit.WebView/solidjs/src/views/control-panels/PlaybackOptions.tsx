import { createSignal } from "solid-js";
import Text from "../../components/content/Text";
import Slider from "../../components/forms/Slider";
import { useGlobalState } from "../../context/GlobalStore";
import translate from "../../localization/translate";
import RepeatOptions from "./RepeatOptions";


export default function PlaybackOptions()
{
    const [ getSpeed, setSpeed ] = createSignal<number>(100)
    const [ state, _ ] = useGlobalState()

    const handleChange = (e: any)=>{
        setSpeed(e.target.value)
    }

    return <div class="flex flex-col pr-1 pt-2 gap-1">
        <Text content>
            {translate("Playback Speed")}:
        </Text>
        <div>
            <Slider class="h-6" min={0} max={300} step={25} lockBefore={25} value={getSpeed()} onChange={handleChange}>
                <Text class="text-xs pt-0.5" content invert>
                    {getSpeed()}%
                </Text>
            </Slider>
        </div>
        <Text class="mt-4" content>
            <RepeatOptions />
        </Text>
    </div>
}