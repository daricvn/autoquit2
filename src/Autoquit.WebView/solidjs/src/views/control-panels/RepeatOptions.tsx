import { createMemo, createSignal, Match, Switch } from "solid-js";
import EditableDropdown from "../../components/dropdown/EditableDropdown";
import translate from "../../localization/translate";
import { RepeatType } from "../../models/RepeatType";

const repeatOptions : RepeatType[] = [ RepeatType.None, RepeatType.Times, RepeatType.Timer, RepeatType.Schedule ]

export default function RepeatOptions()
{
    const [ getType, setType ] = createSignal<RepeatType>(RepeatType.None)

    const items = createMemo(()=> repeatOptions.map(x=> ({ type: x, text: translate(x) })))

    const handleChange = (val: any, index: number)=>{
        setType(val.value)
    }

    return <div class="flex flex-col gap-2">
        <div class="flex gap-1 items-center">
            <div>
                {translate("Repeat")}:
            </div>
            <div>
                <EditableDropdown items={items()} value={getType()} onChange={handleChange} dataMember="type" displayMember="text" selectOnly noFilter disableClearItem={true} />
            </div>
        </div>
        <div>
            <Switch>
                <Match when={ getType() == RepeatType.None }>
                    None Type
                </Match>
                <Match when={ getType() == RepeatType.Times }>
                    Times Type
                </Match>
                <Match when={ getType() == RepeatType.Timer }>
                    Timer Type
                </Match>
                <Match when={ getType() == RepeatType.Schedule }>
                    Schedule Type
                </Match>
            </Switch>
        </div>
    </div>
}