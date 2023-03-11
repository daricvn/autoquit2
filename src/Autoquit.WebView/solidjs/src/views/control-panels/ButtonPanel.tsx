import PlayButton from "../../components/buttons/implements/PlayButton";
import RecordButton from "../../components/buttons/implements/RecordButton";
import { useGlobalState } from "../../context/GlobalStore";
import { AppState } from "../../models/AppState";
export default function ButtonPanel(){
    const [ state, _] = useGlobalState()
    return <div class="flex right-0 items-center justify-right pr-1">
        <div class="grow text-right">
            <PlayButton class="w-full max-w-sm" disabled={state.appState === AppState.Recording} />
        </div>
        <div>
            <RecordButton class="w-16" disabled={state.appState === AppState.Playback} />
        </div>
    </div>
}