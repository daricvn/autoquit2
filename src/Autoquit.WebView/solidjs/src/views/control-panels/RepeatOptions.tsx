import { createEffect, createMemo, createSignal, JSX, lazy, Match, Switch } from "solid-js";
import EditableDropdown from "../../components/dropdown/EditableDropdown";
import { useGlobalState } from "../../context/GlobalStore";
import translate from "../../localization/translate";
import { RepeatType } from "../../models/RepeatType";

const TimerCounter = lazy(()=> import("../../components/panels/repeat-options/TimerCounter"));
const TimesCounter = lazy(()=> import("../../components/panels/repeat-options/TimesCounter"));
const repeatOptions : RepeatType[] = [ RepeatType.None, RepeatType.Times, RepeatType.Timer ]

export default function RepeatOptions(props: JSX.InputHTMLAttributes<HTMLInputElement>)
{
    const [ state, setState ] = useGlobalState()

    const items = createMemo(()=> repeatOptions.map(x=> ({ type: x, text: translate(x) })))

    const handleChange = (val: any, index: number)=>{
        setState('playbackOptions', 'repeat', 'type', val.value)
    }

    const onInitRepeatOption = createEffect(()=>{
        if (!state.playbackOptions?.repeat)
            setState('playbackOptions', 'repeat', ()=> ({ type: RepeatType.None }))
    })

    return <div class="flex flex-col gap-2">
        <div class="flex gap-1 items-center">
            <div>
                {translate("Repeat")}:
            </div>
            <div>
                <EditableDropdown items={items()} value={state.playbackOptions?.repeat?.type} onChange={handleChange} dataMember="type" displayMember="text" selectOnly noFilter disableClearItem={true} disableInput
                    disabled={props.disabled} />
            </div>
        </div>
        <div>
            <Switch>
                <Match when={ state.playbackOptions?.repeat?.type == RepeatType.Times }>
                    <TimesCounter disabled={props.disabled} />
                </Match>
                <Match when={ state.playbackOptions?.repeat?.type == RepeatType.Timer }>
                    <TimerCounter disabled={props.disabled} />
                </Match>
            </Switch>
        </div>
    </div>
}