import { createEffect, createMemo, JSX } from "solid-js";
import { useGlobalState } from "../../../context/GlobalStore";
import { useScriptContext } from "../../../context/ScriptContext";
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
    const [ script, setScript ] = useScriptContext();

    const handleChange = (e: any)=>{
        let val = +(e.target?.value ?? 0)
        if (e.target && (val < MIN || val > MAX)) {
            e.target.value = val < MIN ? MIN : MAX;
            val = +e.target.value
        }
        setScript('playbackOptions', 'repeat', 'count', 0)
        setScript('playbackOptions', 'repeat', 'total', convertTimeToNumeric(val, script.playbackOptions?.repeat?.data))
    }

    const handleTypeChange = (value: IEditableDropdownItem | any, index: number)=>{
        setScript('playbackOptions', 'repeat', 'data', value.value);
    }

    createEffect(()=>{
        if (script.playbackOptions?.repeat?.type != RepeatType.Timer) return;
        if (script.playbackOptions?.repeat?.data) return;
        setScript('playbackOptions', 'repeat', 'data', TimerType.seconds)
    })

    const getVal = createMemo(()=> {
        const time = script?.playbackOptions?.repeat?.type == RepeatType.Timer ? (script.playbackOptions?.repeat?.total ?? MIN) : MIN
        return convertNumericToTime(time, script.playbackOptions?.repeat?.data);
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
            <EditableDropdown items={getTimerPreset()} value={script.playbackOptions?.repeat?.data ?? TimerType.seconds} onChange={handleTypeChange} dataMember="key" displayMember="value" selectOnly noFilter disableClearItem={true} disableInput disabled={props.disabled} />
        </div>
    </div>
}