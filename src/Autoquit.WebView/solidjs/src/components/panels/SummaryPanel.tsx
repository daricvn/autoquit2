import { createMemo, Show } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore"
import translate, { formatString } from "../../localization/translate"
import { RepeatInfo, RepeatType } from "../../models/RepeatType"
import { formatTimer, TimerType } from "../../models/TimerType"

export default function SummaryPanel()
{
    const [ state, _ ] = useGlobalState()

    const repeatStatus = createMemo(()=>{
        if (state.playbackOptions?.repeat?.type && RepeatInfo[state.playbackOptions?.repeat?.type])
            return RepeatInfo[state.playbackOptions?.repeat?.type];
        return null
    })

    const repeatRemaining = createMemo(()=>{
        if (!repeatStatus()) return undefined;
        const res = (state.playbackOptions?.repeat?.total ?? 0) - (state.playbackOptions?.repeat?.count ?? 0);
        if (state.playbackOptions?.repeat?.type != RepeatType.Timer) return res;
        return formatTimer(res)
    })

    return <div class={`w-full min-h-12 p-1 text-xs ${state.getBackgroundInvert?.call(null, state)} border-gray-500 border-2 text-${state.getTextColourInvert?.call(null, state)}`}>
        {translate("Summary")}
        <hr class="max-w-32 mb-1" />
        <div class="flex gap-1">
            <div>
                {translate("Playback Speed")}:
            </div>
            <div>
                { state.playbackOptions?.speed ?? 100 }\[%\]
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