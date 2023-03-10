import PlayButton from "../../components/buttons/implements/PlayButton";
import RecordButton from "../../components/buttons/implements/RecordButton";

export default function ButtonPanel(){


    return <div class="flex right-0 items-center justify-right pr-1">
        <div class="grow text-right">
            <PlayButton class="w-full max-w-sm" />
        </div>
        <div>
            <RecordButton class="w-16" />
        </div>
    </div>
}