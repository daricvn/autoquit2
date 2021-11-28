
import { createSignal } from "solid-js"
import { Transition } from "solid-transition-group"
import { useGlobalState } from "../../store"
import WaveButton from "../buttons/WaveButton"
import { CircularProgressWithText } from "../progress/CircularProgress"

export default function BottomNav(){
    const [ state, setState ] = useGlobalState()

    const testUpdate = ()=>{
        setState("process", ()=> state.process ? "": "Processing...")
    }

    return <div className={`w-screen h-9 fixed bottom-0 block bg-${state.getAccent(state)}`}>
        <div className="grid grid-cols-3 gap-1 pt-1">
            <div class="col-span-2">
                <CircularProgressWithText className="pl-2" size="8" width="2" color={state.getTextColour(state)} hidden={!state.process}>
                    <div className={`text-${state.getTextColour(state)} text-sm pt-1 relative`}>
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
                <WaveButton className={`rounded-full text-${state.getTextColour(state)} w-8 h-8 group`}
                    onClick={()=> testUpdate()}>
                    <i className="fas fa-cog transition-all duration-500 transform group-hover:rotate-180"></i>
                </WaveButton>
            </div>
        </div>
    </div>
}