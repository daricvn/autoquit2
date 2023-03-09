import BottomNav from "../../components/nav/StatusNav";
import { ResizablePanel } from "../../components/panels/ResizablePanel";
import { ScriptTable } from "../../components/table/ScriptTable";
import ControlPanels from "../control-panels/ControlPanels";


export default function Main(){
    return <div class="h-full w-full">
        <ResizablePanel columns={[0, 350]} class={"w-full h-full"} rightToLeft={true}>
            <div class="h-full" style="min-width: 640px">
                <ScriptTable />
            </div>
            <div class="pl-2 h-full" style="min-width: 240px">
                <ControlPanels />
            </div>
        </ResizablePanel>
        <BottomNav></BottomNav>
    </div>
}