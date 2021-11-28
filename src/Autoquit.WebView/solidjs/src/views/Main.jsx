import { onMount } from "solid-js"
import SubContent from "../components/SubContent"
import { useGlobalState } from "../store"
import About from "./About"
import AppPortal from "./AppPortal"
import MainHeader from "./MainHeader"

const accentList = ['info', 'danger', 'warning', 'green', 'orange']

export default function Main(){
    const [ state, setState ] = useGlobalState()

    onMount(()=>{
        setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
        window.onresize = ()=>{
            setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
        }
    })

    return <div class={state.getBackground(state)} style="min-width: 100vw; min-height: 100vh">
        <MainHeader />
        <SubContent className="container mx-auto" title="About">
            <About />
        </SubContent>
        <AppPortal />
        {
            state.block &&
            <div className="fixed w-screen h-screen bg-black opacity-30 top-0 left-0 select-none" style="z-index: 10000"></div>
        }
    </div>
}