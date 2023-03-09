import { createSignal, lazy, Show } from "solid-js";
import { useGlobalState } from "../../context/GlobalStore";
import translate from "../../localization/translate";
import { AppRequests } from "../../requests/AppRequests";
import FlatCircleButton from "../buttons/FlatCircleButton";
import ProcessesDropdownList from "../dropdown/ProcessesDropdownList";
import Tooltip from "../tooltip/Tooltip";

const About = lazy(()=> import("../../views/about/About"));

export default function Header(){
    const [ state, setState ] = useGlobalState()
    const [ showAbout, setShowAbout ] = createSignal<boolean | undefined>(undefined)

    const bringToTop = ()=>{
        if (!state.target)
            return;
        AppRequests.bringToTop(state.target)
            .then((res)=>{
                if (res.data.Status == 404) {
                    window.showWarning("The application exited or access denied")
                }
            })
    }

    return <div class={`h-12 bg-${state.getAccent?.call(null, state)} px-1`}>
        <div class={`grid grid-cols-5 ${state.preventHeader ? 'pointer-events-none':''}`}>
            <div class="col-span-3">
                <ProcessesDropdownList />
            </div>
            <div class="pl-2 pt-2">
                <Tooltip value={translate("Bring to front")} position="right">
                    <FlatCircleButton class={`text-white rounded-full mr-2 hover:shadow-inner`} size={8} disabled={!state.target}
                        onClick={bringToTop}>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </FlatCircleButton>
                </Tooltip>
            </div>
            <div class="text-right pt-2">
                <FlatCircleButton class={`text-white mr-2 hover:shadow-inner`} size={8}
                    onClick={()=> {setShowAbout(true);}}>
                    <i class="fa fa-info-circle"></i>
                </FlatCircleButton>
            </div>
        </div>
        <Show when={showAbout() !== undefined}>
            <About show={showAbout()} onClose={()=> setShowAbout(false) } />
        </Show>
    </div>
}