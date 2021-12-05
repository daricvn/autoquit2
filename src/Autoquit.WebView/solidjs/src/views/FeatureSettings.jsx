import Checkbox from "../components/forms/Checkbox";
import Text from "../components/forms/Text";
import Tooltip from "../components/utilities/Tooltip";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

export default function FeatureSettings(props){
    const [state, setState] = useGlobalState()

    return <div className="flex flex-col space-y-2 pl-6">
        <div>
            <Tooltip offset="14" value={translate("Improve performance by reducing scan frequency")}>
                <Checkbox>
                    <Text>{translate("Scan throttling")}</Text>
                </Checkbox>
            </Tooltip>
        </div>
        <div>
            <Tooltip offset="14" value={translate("Display system processes in the scan result")}>
                <Checkbox>
                    <Text>{translate("Include system processes")}</Text>
                </Checkbox>
            </Tooltip>
        </div>
    </div>
}