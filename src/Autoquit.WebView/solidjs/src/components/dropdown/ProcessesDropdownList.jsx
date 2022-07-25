import { createMemo, createSignal, onMount } from "solid-js";
import translate from "../../libs/i18n";
import { AppRequests } from "../../requests/AppRequests";
import { useGlobalState } from "../../store";
import EditableDropdown from "./EditableDropdown";

export default function ProcessesDropdownList(props){
    const [ state, setState ] = useGlobalState()
    const [ getProcesses, setProcesses ] = createSignal([])
    const [ getLoadingProc, setLoadingProc ] = createSignal(false)
    const [ getTarget, setTarget ] = createSignal()
    const [ getLastFetch, setLastFetch ] = createSignal(0)

    onMount(()=>{
        fetchProcesses()
    })

    const timeThreshold = createMemo(()=> state().scanThrottle ? 20 : 2);

    const fetchProcesses = ()=>{
        const currentTime = new Date().getTime() / 1000
        if (getLoadingProc() || currentTime - getLastFetch() <= timeThreshold())
            return
        setLoadingProc(true)
        setLastFetch(currentTime);
        setState("process", "Scanning Processes...")
        AppRequests.getProcesses().then(res=>{
            if (res.data){
                setProcesses(res.data.map(x=> ({ ...x, Icon: x.IconSrc ? "data:image/png;base64, "+ x.IconSrc: '' })));
                setLastFetch(new Date().getTime() / 1000);
            }
        })
        .finally(()=>{
            setLoadingProc(false)
            setState("process", "")
        })
    }

    const onTargetChanged = (item, i)=>{
        setTarget(item)
        setState('target', item.value)
    }


    return <EditableDropdown className="pt-1"
                    onOpening={fetchProcesses}
                    isLoading={getLoadingProc()}
                    displayMember="Name"
                    dataMember="Id"
                    iconMember="Icon"
                    items={getProcesses()}
                    value={getTarget()}
                    onChange={onTargetChanged}
                    placeholder={translate("Select Process")}
                ></EditableDropdown>
}