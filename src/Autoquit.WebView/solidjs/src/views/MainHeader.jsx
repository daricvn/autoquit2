import { createSignal } from "solid-js";
import FlatCircleButton from "../components/buttons/FlatCircleButton";
import ProcessesDropdownList from "../components/dropdown/ProcessesDropdownList";
import Header from "../components/navs/Header";
import Tooltip from "../components/utilities/Tooltip";
import translate from "../libs/i18n";
import { AppRequests } from "../requests/AppRequests";
import { useGlobalState } from "../store";
import About from "./About";

export default function MainHeader(){
    const [ state, setState ] = useGlobalState()
    const [ showAbout, setShowAbout ] = createSignal(false)

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

    return <Header>
        <div className={`grid grid-cols-5 ${state.blockHeader ? 'pointer-events-none':''}`}>
            <div className="col-span-3">
                <ProcessesDropdownList />
            </div>
            <div class="pl-2 pt-2">
                <Tooltip value={translate("Bring to front")} position="right">
                    <FlatCircleButton className={`text-white rounded-full mr-2 hover:shadow-inner`} size={8} disabled={!state.target}
                        onClick={bringToTop}>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </FlatCircleButton>
                </Tooltip>
            </div>
            <div className="text-right pt-2">
                <FlatCircleButton className={`text-white mr-2 hover:shadow-inner`} size={8}
                    onClick={()=> setShowAbout(true)}>
                    <i className="fa fa-info-circle"></i>
                </FlatCircleButton>
            </div>
        </div>
        <About show={showAbout} onClose={()=> setShowAbout(false) } />
    </Header>
}