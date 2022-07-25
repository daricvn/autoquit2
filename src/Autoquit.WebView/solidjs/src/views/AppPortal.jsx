import { ResizablePanel } from "../components/forms/ResizablePanel";
import { ScriptTable } from "../components/forms/ScriptTable";
import BottomNav from "../components/navs/BottomNav";

export default function AppPortal(){
    return <div className="h-full w-full">
        <ResizablePanel columnSize={[0, 350]} className={"w-full h-full"} rightToLeft={true}>
            <div className="h-full" style="min-width: 640px">
                <ScriptTable />
            </div>
            <div className="pl-2 h-full" style="min-width: 240px">Hello World</div>
        </ResizablePanel>
        <BottomNav></BottomNav>
    </div>
}