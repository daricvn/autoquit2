import { createMemo, createSignal, onMount } from "solid-js";
import { useGlobalState } from "../../context/GlobalStore";
import translate, { formatString } from "../../localization/translate";
import { AppRequests } from "../../requests/AppRequests";
import EditableDropdown from "./EditableDropdown";

declare global {
    interface Window {
        findAndSelectProcess: (processName: string) => void;
    }
  }

export default function ProcessesDropdownList(){
    const [ state, setState ] = useGlobalState()
    const [ getProcesses, setProcesses ] = createSignal<any[]>([])
    const [ getLoadingState, setLoadingState ] = createSignal(false)
    const [ getTarget, setTarget ] = createSignal<any>()
    const [ getLastFetch, setLastFetch ] = createSignal(0)
    const [ shouldFilter, setShouldFilter ] = createSignal(true)

    onMount(()=>{
        fetchProcesses()
    })

    const timeThreshold = createMemo(()=> state.scanThrottling ? 16 : 2);

    const onStateChange = (open: boolean)=>{
        if (open)
            fetchProcesses();
    }

    const fetchProcesses = ()=>{
        return new Promise<any[]>((resolve, reject)=>{
            const currentTime = new Date().getTime() / 1000
            if (getLoadingState() || currentTime - getLastFetch() <= timeThreshold()){
                resolve(getProcesses())
                return
            }
            setLoadingState(true)
            setLastFetch(currentTime);
            setState('processingStatus', "Scanning Processes...")
            AppRequests.getProcesses().then(res=>{
                if (res.data.Status == 200 && res.data.Content){
                    let list = (res.data.Content as any[]).map(x => ({ ...x, IconSrc: x.IconSrc ? "data:image/png;base64, "+ x.IconSrc: '' }))
                    setProcesses(list);
                    setLastFetch(new Date().getTime() / 1000);
                    resolve(list)
                }
                else reject?.call(null)
                if (res.data.Status != 200)
                    window.showWarning("Cannot retrieve application information")
            })
            .catch((e)=>{
                window.showWarning("Cannot retrieve application information")
                reject?.call(null)
            })
            .finally(()=>{
                doneUpdateProcess()
            })
        })
    }

    const selectProcessByExt = (list: any[], name: string) => {
        if (list == null || !name)
            return;
        for (let i = 0; i < list.length; i++)
            if (list[i].Ext && list[i].Ext.toLowerCase() == name.toLowerCase())
            {
                onTargetChanged({ text: list[i].Name, value: list[i].Id, icon: list[i].IconSrc }, i)
                return;
            }
        window.showWarning(formatString(translate("Cannot find the process {0}"), name))
    }

    const doneUpdateProcess = ()=>{
        setLoadingState(false)
        setState('processingStatus', "")
    }

    const onTargetChanged = (item: any, i: number)=>{
        if (i < 0){
            setTarget(null)
            setState('target', "")
            setShouldFilter(true)
            return;
        }
        setShouldFilter(false)
        setTarget(item)
        setState('target', item.value)
    }

    window.findAndSelectProcess = (exeName) => {
        fetchProcesses().then(list=>{
            selectProcessByExt(list, exeName)
        })
    }

    return <EditableDropdown class="pt-1"
                    onStateChange={onStateChange}
                    loading={getLoadingState()}
                    displayMember="Name"
                    dataMember="Id"
                    iconMember="IconSrc"
                    items={getProcesses()}
                    value={getTarget()}
                    onChange={onTargetChanged}
                    placeholder={translate("Select Process")}
                    noFilter={!shouldFilter()}
                ></EditableDropdown>
}