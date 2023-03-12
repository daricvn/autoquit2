import { createMemo, Show } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"
import { useScriptContext } from "../../context/ScriptContext"
import translate, { formatString } from "../../localization/translate"
import { RepeatInfo, RepeatType } from "../../models/RepeatType"
import { formatTimer, TimerType } from "../../models/TimerType"

export default function SummaryPanel()
{
    const [ state, _ ] = useGlobalState()
    const [ script, setScript ] = useScriptContext()

    const repeatStatus = createMemo(()=>{
        if (script.playbackOptions?.repeat?.type && RepeatInfo[script.playbackOptions?.repeat?.type])
            return RepeatInfo[script.playbackOptions?.repeat?.type];
        return null
    })

    const repeatRemaining = createMemo(()=>{
        if (!repeatStatus()) return undefined;
        const res = (script.playbackOptions?.repeat?.total ?? 0) - (script.playbackOptions?.repeat?.count ?? 0);
        if (script.playbackOptions?.repeat?.type != RepeatType.Timer) return res;
        return formatTimer(res)
    })

    return <div class={`w-full min-h-12 p-1 text-xs ${state.getBackgroundInvert} border-gray-500 border-2 text-${state.getTextColourInvert}`}>
        {translate("Summary")}
        <hr class="max-w-32 mb-1" />
        <div class="flex gap-1">
            <div>
                {translate("Playback Speed")}:
            </div>
            <div>
                { script.playbackOptions?.speed ?? 100 }\[%\]
            </div>
        </div>
        <Show when={repeatStatus()}>
            <div class="flex gap-1">
                <div>
                    {translate("Repeat")}:
                </div>
                <div>
                    { formatString(translate(repeatStatus()), repeatRemaining()) }
                </div>
            </div>
        </Show>
    </div>
}