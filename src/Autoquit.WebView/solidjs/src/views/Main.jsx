import { createSignal } from "solid-js"
import WaveButton from "../components/buttons/WaveButton"
import EditableDropdown from "../components/dropdown/EditableDropdown"
import Header from "../components/navs/Header"
import NavTitle from "../components/navs/NavTitle"
import Tooltip from "../components/utilities/Tooltip"
import translate from "../libs/i18n"
import { useGlobalState } from "../store"

const accentList = ['info', 'danger', 'warning', 'green', 'orange']

export default function Main(){
    const [ state, setState ] = useGlobalState()
    const [ getRoulete, setRoulete ] = createSignal(0)
    const [ getItem, setItem ] = createSignal()
    const updateState = ()=>{
        const newRoulete = (getRoulete() + 1) % accentList.length
        setRoulete(newRoulete)
        setState('accent', ()=> accentList[newRoulete])
        setState('theme', (current)=> current == 'dark'? 'light':'dark')
    }

    const handleChange = (item, index)=>{
        if (index >= 0)
            return setItem(item)   
        return setItem("")
    }

    return <div class={state.getBackground(state)} style="min-width: 100vw; min-height: 100vh">
        <Header>
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <EditableDropdown className="pt-1" items={accentList} value={getItem()} onChange={handleChange}
                        newItemText={`${translate("Create New")()}...`}
                        placeholder={translate("Select File")()}
                    ></EditableDropdown>
                </div>
                <div class="pl-2 pt-2">
                    <WaveButton className={`transition-colors px-3 py-1 text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:shadow-inner rounded-lg mr-2`} onClick={updateState}>
                        <i className="fa fa-save mr-2"></i>
                        {translate("Save")}
                    </WaveButton>
                    <Tooltip value={translate("Delete")()}>
                        <WaveButton className={`transition-colors px-3 py-1 text-white bg-red-500 border border-red-500 rounded-lg mr-2 hover:shadow-inner hover:bg-red-600`} onClick={updateState}>
                            <i className="fa fa-trash-alt"></i>
                        </WaveButton>
                    </Tooltip>
                </div>
            </div>
        </Header>
        <div className="container mx-auto">
            <NavTitle>
                Test
            </NavTitle>
        </div>
    </div>
}