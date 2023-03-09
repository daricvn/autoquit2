import Text from "../../components/content/Text"
import KeyBinder from "../../components/forms/KeyBinder"
import { useGlobalState } from "../../context/GlobalStore"
import { IVoid } from "../../interfaces/ICommon"
import translate from "../../localization/translate"

export interface IBindingSettings {
    onChange: IVoid;
}

export default function BindingSettings(props: IBindingSettings){
    const [state, setState] = useGlobalState()

    return <div class="grid-2-cols pl-6" style="gap: 6px">
        <Text class="self-center">{translate("Play/Stop")}:</Text>
        <div>
            <KeyBinder />
        </div>
        <Text class="self-center">{translate("Record/Stop")}:</Text>
        <div>
            <KeyBinder />
        </div>
    </div>
}