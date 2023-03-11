import { createEffect, createMemo, JSX } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import { IKeyValue } from "../../../interfaces/IKeyValue";
import translate from "../../../localization/translate";
import { RepeatType } from "../../../models/RepeatType";
import { convertNumericToTime, convertTimeToNumeric, TimerType } from "../../../models/TimerType";
import EditableDropdown from "../../dropdown/EditableDropdown";
import IEditableDropdownItem from "../../dropdown/IEditableDropdownItem";
import TextBox from "../../forms/TextBox";

const MIN = 1;
const MAX = 9999;
const timerList = [ TimerType.seconds, TimerType.minutes, TimerType.hours ]

export default function TimerCounter(props: JSX.InputHTMLAttributes<HTMLInputElement>)
{
    const [ state, setState ] = useGlobalState();

    const handleChange = (e: any)=>{
        let val = +(e.target?.value ?? 0)
        if (e.target && (val < MIN || val > MAX)) {
            e.target.value = val < MIN ? MIN : MAX;
            val = +e.target.value
        }
        setState('playbackOptions', 'repeat', 'count', 0)
        setState('playbackOptions', 'repeat', 'total', convertTimeToNumeric(val, state.playbackOptions?.repeat?.data))
    }

    const handleTypeChange = (value: IEditableDropdownItem | any, index: number)=>{
        setState('playbackOptions', 'repeat', 'data', value.value);
    }

    createEffect(()=>{
        if (state.playbackOptions?.repeat?.type != RepeatType.Timer) return;
        if (state.playbackOptions?.repeat?.data) return;
        setState('playbackOptions', 'repeat', 'data', TimerType.seconds)
    })

    const getVal = createMemo(()=> {
        const time = state?.playbackOptions?.repeat?.type == RepeatType.Timer ? (state.playbackOptions?.repeat?.total ?? MIN) : MIN
        return convertNumericToTime(time, state.playbackOptions?.repeat?.data);
    })

    const getTimerPreset = createMemo<IKeyValue[]>(()=> timerList.map(x=> ({ key: x, value: translate(x)})))

    return <div class="flex gap-1 items-center text-sm">
        <div>
            {translate("For")}
        </div>
        <div>
            <TextBox type="number" min={MIN} max={MAX} onChange={handleChange} value={getVal()} disabled={props.disabled} />
        </div>
        <div>
            <EditableDropdown items={getTimerPreset()} value={state.playbackOptions?.repeat?.data ?? TimerType.seconds} onChange={handleTypeChange} dataMember="key" displayMember="value" selectOnly noFilter disableClearItem={true} disableInput disabled={props.disabled} />
        </div>
    </div>
}