import AccentSelector from "../components/settings/AccentSelector";
import translate from "../libs/i18n";
import { useGlobalState } from "../store";

let version = "2.0.0"
let flavour = "Windows"

export default function About(){
    const [ state, setState ] = useGlobalState()
    return <div className="flex space-x-4">
        <div>
            <div style="background-image: url('/favicon.png'); background-size: contain; background-repeat: no-repeat; min-width: 200px; min-height: 200px; max-height: 400px; height: 100%;" />
        </div>
        <div className="flex-auto">
            <div className={`pl-4 pr-2 pt-2 text-${state.getTextColour(state)}`}>
                <div className="text-center">
                    <h5 class="font-bold text-3xl mb-2">Autoquit</h5>
                    <span class="font-bold text-lg">{translate("Build")}:</span> {version}<br /> 
                    <span class="font-bold text-lg">{translate("Version")}:</span> {flavour}
                </div>
                <hr class="mt-3" />
                <div class="mt-3 text-body-2">
                    Autoquit is an open-source automation tool developed by <b>Darick Nguyen.</b> <br />
                    It can operate many commands on your desktop automatically with or without focusing on the application, by providing the script that you wrote or recorded, not only let you freely change the playback speed, but also allow you to link between scripts to make a chain of behaviour when automating your repetitive works.
                </div>
            </div>
        <AccentSelector />
        </div>
    </div>
}