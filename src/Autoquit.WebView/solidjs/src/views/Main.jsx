import { createSignal } from "solid-js"
import WaveButton from "../components/buttons/WaveButton"
import { useGlobalState } from "../store"

const accentList = ['info', 'danger', 'warning', 'green', 'orange']

export default function Main(){
    const [ state, setState ] = useGlobalState()
    const [ getRoulete, setRoulete ] = createSignal(0)
    console.log(state.getAccent(state))
    const updateState = ()=>{
        const newRoulete = (getRoulete() + 1) % accentList.length
        setRoulete(newRoulete)
        setState('accent', ()=> accentList[newRoulete])
        setState('theme', (current)=> current == 'dark'? 'light':'dark')
    }

    return <div class={state.getBackground(state)} style="min-width: 100vw; min-height: 100vh">
        <WaveButton className={`border text-${state.getAccent(state)} border-${state.getAccent(state)} rounded-lg`} onClick={updateState}>Test</WaveButton>
    </div>
}