import { createEffect, onMount, Show } from "solid-js"
import Header from "../components/nav/Header"
import { useGlobalState } from "../context/GlobalStore"
import { useLocalizationContext } from "../context/LocalizationContext"
import translate from "../localization/translate"
import Main from "./main/Main"

export default function Index(){
    const [ state, _ ] = useGlobalState()
    const [ localize, setLocalize ] = useLocalizationContext()
    onMount(()=>{
        if (localize.language)
            setLocalize(localize.language)
                .catch(status=>{
                    if (status == 200)
                        window.showWarning(translate("Invalid localization file"))
                    else window.showWarning(translate("Cannot locate the localization file"))
                })
    })

    return <div class={`${state.getBackground} flex flex-col`} style="height: 100vh">
        <Header />
        <div class="flex-grow relative overflow-y-auto overflow-x-hidden pb-8">
        <Main></Main>
        </div>
        <Show when={state.preventAccess}>
            <div class="whiteboard-overlay"></div>
        </Show>
    </div>
}