import { useNavigate } from "solid-app-router"
import { onMount } from "solid-js"
import MainRoutes from "../routes/config"
import { useGlobalState } from "../store"
import MainHeader from "./MainHeader"

const accentList = ['info', 'danger', 'warning', 'green', 'orange']

export default function Main(){
    const [ state, setState ] = useGlobalState()
    const navigate = useNavigate()
    onMount(()=>{
        setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
        window.onresize = ()=>{
            setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
        }
        navigate('/')
    })

    return <div class={`${state.getBackground(state)} flex flex-col`} style="height: 100vh">
        <MainHeader />
        <div className="flex-grow relative overflow-y-auto overflow-x-hidden pb-4">
            <MainRoutes />
        </div>
        {
            state.block &&
            <div className="fixed w-screen h-screen bg-black opacity-30 top-0 left-0 select-none" style="z-index: 10000"></div>
        }
    </div>
}