import PlayButton from "../../components/buttons/implements/PlayButton";
import RecordButton from "../../components/buttons/implements/RecordButton";

export default function ButtonPanel(){


    return <div class="flex gap-2 right-0 items-center justify-center pr-2">
        <div>
            <PlayButton />
        </div>
        <div>
            <RecordButton />
        </div>
    </div>
}