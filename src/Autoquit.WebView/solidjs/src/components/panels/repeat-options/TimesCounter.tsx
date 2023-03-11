import { createEffect, createMemo, JSX } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import translate from "../../../localization/translate";
import { RepeatType } from "../../../models/RepeatType";
import TextBox from "../../forms/TextBox";

const MIN = 1;
const MAX = 9999;

export default function TimesCounter(props: JSX.InputHTMLAttributes<HTMLInputElement>)
{
    const [ state, setState ] = useGlobalState();

    const handleChange = (e: any)=>{
        const val = +(e.target?.value ?? 0)
        if (e.target && (val < MIN || val > MAX)) {
            e.target.value = state.playbackOptions?.repeat?.total ?? MIN;
            return
        }
        setState('playbackOptions', 'repeat', 'count', 0)
        setState('playbackOptions', 'repeat', 'total', val)
    }

    const getVal = createMemo(()=> state?.playbackOptions?.repeat?.type == RepeatType.Times ? (state.playbackOptions?.repeat?.total ?? MIN) : MIN)

    return <div class="flex gap-1 items-center text-sm">
        <div>
            {translate("Number of repeat")}
        </div>
        <div>
            <TextBox type="number" min={MIN} max={MAX} onChange={handleChange} value={getVal()} disabled={props.disabled} />
        </div>
    </div>
}