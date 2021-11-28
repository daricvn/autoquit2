
import { createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import translate from "../../libs/i18n"
import { useGlobalState } from "../../store"
import WaveButton from "../buttons/WaveButton"
import { CircularProgressWithText } from "../progress/CircularProgress"
import Tooltip from "../utilities/Tooltip"

export default function BottomNav(){
    const [ state, setState ] = useGlobalState()

    const testUpdate = ()=>{
        setState("process", ()=> state.process ? "": "Running...")
    }

    return <div className={`w-screen h-9 fixed bottom-0 block bg-${state.getAccent(state)}`}>
        <div className="grid grid-cols-3 gap-1 pt-1">
            <div class="col-span-2">
                <CircularProgressWithText className="pl-2" size="8" width="2" color="white" hidden={!state.process}>
                    <div className="text-white text-sm pt-1 relative select-none">
                        <Transition name="slide-left">
                            {
                                state.process &&
                                <span>{state.process}</span>
                            }
                        </Transition>
                    </div>
                </CircularProgressWithText>
            </div>
            <div className="text-right pr-1">
                <Tooltip value={translate("Settings")} position="left">
                    <WaveButton className={`rounded-full text-white w-8 h-8 group`}
                        onClick={()=> testUpdate()}>
                        <i className="fas fa-cog transition-all duration-500 transform group-hover:rotate-180"></i>
                    </WaveButton>
                </Tooltip>
            </div>
        </div>
    </div>
}