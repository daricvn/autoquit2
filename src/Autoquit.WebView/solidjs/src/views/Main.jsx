import { createEffect, onMount, Show } from "solid-js"
import { useLocalizationContext } from "../context/LocalizationContext"
import translate from "../libs/i18n"
import { useGlobalState } from "../store"
import AppPortal from "./AppPortal"
import MainHeader from "./MainHeader"

const accentList = ['info', 'danger', 'warning', 'green', 'orange']

export default function Main(){
    const [ state, setState ] = useGlobalState()
    const [ localize, setLocalize ] = useLocalizationContext()
    onMount(()=>{
        setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
        window.onresize = ()=>{
            if (window.raiseResizeEvent)
                window.raiseResizeEvent()
        }
        if (localize.language)
            setLocalize(localize.language)
                .catch(status=>{
                    if (status == 200)
                        window.showWarning(translate("Invalid localization file"))
                    else window.showWarning(translate("Cannot locate the localization file"))
                })
    })

    window.raiseResizeEvent = ()=>{
        setState('size', ()=> ({ width: window.innerWidth, height: window.innerHeight }))
    }

    return <div class={`${state.getBackground(state)} flex flex-col`} style="height: 100vh">
        <MainHeader />
        <div className="flex-grow relative overflow-y-auto overflow-x-hidden pb-8">
        <AppPortal />
        </div>
        <Show when={state.block}>
            <div className="whiteboard-overlay"></div>
        </Show>
    </div>
}