import { createMemo, createSignal, onMount } from "solid-js";
import translate, { formatString } from "../../libs/i18n";
import { AppRequests } from "../../requests/AppRequests";
import { useGlobalState } from "../../store";
import EditableDropdown from "./EditableDropdown";

const findIndex = (lists, target)=>{
    let start = 0;
    for (let i = lists.length - 1; i >= 0; i--)
    {
        if (lists[i].Id > target.Id)
            start = i;
        if (lists[i].Id == target.Id)
            return [i, start]
    }
    return [-1, start]
}

export default function ProcessesDropdownList(props){
    const [ state, setState ] = useGlobalState()
    const [ getProcesses, setProcesses ] = createSignal([])
    const [ getLoadingProc, setLoadingProc ] = createSignal(false)
    const [ getTarget, setTarget ] = createSignal()
    const [ getLastFetch, setLastFetch ] = createSignal(0)
    const [ shouldFilter, setShouldFilter ] = createSignal(true)

    onMount(()=>{
        fetchProcesses()
    })

    const timeThreshold = createMemo(()=> state.scanThrottle ? 12 : 2);

    const fetchProcesses = ()=>{
        return new Promise((resolve, reject)=>{
            const currentTime = new Date().getTime() / 1000
            if (getLoadingProc() || currentTime - getLastFetch() <= timeThreshold()){
                resolve(getProcesses())
                return
            }
            setLoadingProc(true)
            setLastFetch(currentTime);
            setState("process", "Scanning Processes...")
            AppRequests.getProcesses().then(res=>{
                if (res.data.Status == 200 && res.data.Content){
                    let list = res.data.Content.map(x=> ({ ...x, IconSrc: x.IconSrc ? "data:image/png;base64, "+ x.IconSrc: '' }))
                    setProcesses(list);
                    setLastFetch(new Date().getTime() / 1000);
                    resolve(list)
                }
                else reject()
                if (res.data.Status != 200)
                    window.showWarning(translate("Cannot retrieve application information"))
            })
            .catch((e)=>{
                window.showWarning(translate("Cannot retrieve application information"))
                reject()
            })
            .finally(()=>{
                doneUpdateProcess()
            })
        })
    }

    window.findAndSelectProcess = (exeName) => {
        fetchProcesses().then(list=>{
            selectProcessByExt(list, exeName)
        })
    }
    const selectProcessByExt = (list, name) => {
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
        setLoadingProc(false)
        setState("process", "")
    }

    const onTargetChanged = (item, i)=>{
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

    return <EditableDropdown className="pt-1"
                    onOpening={fetchProcesses}
                    isLoading={getLoadingProc()}
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