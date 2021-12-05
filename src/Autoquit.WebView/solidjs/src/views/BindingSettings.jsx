import Text from "../components/forms/Text";
import KeyBind from "../components/settings/KeyBind";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

export default function BindingSettings(){
    const [state, setState] = useGlobalState()

    return <div className="grid-2-cols pl-6" style="gap: 6px">
        <Text className="self-center">{translate("Play/Stop")}:</Text>
        <div>
            <KeyBind />
        </div>
        <Text className="self-center">{translate("Record/Stop")}:</Text>
        <div>
            <KeyBind />
        </div>
    </div>
}