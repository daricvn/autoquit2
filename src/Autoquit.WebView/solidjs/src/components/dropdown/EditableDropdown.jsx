import { list } from "postcss"
import { createMemo, createSignal, createEffect, For, Show } from "solid-js"
import createDebounce from "../../libs/createDebounce"
import { useGlobalState } from "../../store"
import Content from "../forms/Content"
import CircularProgress from "../progress/CircularProgress"

const ICON_SIZE = 56;

export default function EditableDropdown(props){
    const [ getOpen, setOpen ] = createSignal(false)
    const [ getCurrentInput, setCurrentInput ] = createSignal()
    const debounce = createDebounce()
    const [ state, getState ] = useGlobalState()
    const key = props.dataMember
    const value = props.displayMember
    const iconVal = props.iconMember
    let dropdownInput
    let listElement

    createEffect(()=>{
        if (props){
            if (getOpen() && props.onOpening)
                props.onOpening(this)
            else if (!getOpen() && props.onClosing)
                props.onClosing(this)
        }
    })

    createEffect(()=>{
        getOpen();
        if (!listElement || !dropdownInput || !getOpen())
            return;
        // Just for tracking
        if (props.items) {}
        if (props.position == "top") {
            const top = listElement.offsetHeight + 6;
            listElement.style.top = "-" + top + "px"
        }
        else {
            listElement.style.top = dropdownInput.parentElement.offsetHeight + "px"            
            listElement.style.bottom = ""
        }
    })

    const onItemSelected = (item, index, retain)=>{
        if (props.onChange)
            props.onChange(item, index)
        if (!retain)
            setOpen(false)
        debounce(updateCurrentInput, 500)
    }

    const onCreateNew = ()=>{
        onItemSelected("", -1)
        if (props.onRequest)
            props.onRequest()
    }

    const toggleOpen = ()=>{
        if (!props.items)
            return setOpen(false)
        if (getOpen() && props.isLoading)
            return null;
        return setOpen(!getOpen())
    }

    const getItemClassSelected = (data)=>{
        if (!props.value)
            return ""
        if (data == props.value)
            return `border-${state().getAccent(state)}`
        return "";
    }

    const getOpenIndicatorClass = ()=>{
        if (getOpen())
            return "transform-gpu"
        return "transform-gpu rotate-180"
    }

    const getDisplayValue = ()=>{
        if (!props.value || !props.items)
            return ""
        if (props.value.value && props.value.text != null)
            return props.value.text
        for (let i= 0; i< props.items.length; i++)
            if (key && value && props.items[i][key] == props.value)
                return props.items[i][value]
            else if (props.items[i] == props.value)
                return props.items[i]
        return ""
    }

    const handleValueChange = (args) => {
        if (props.preventEdit)
            args.preventDefault()
        if (props.onChange)
            props.onChange(dropdownInput.value, -1)
        debounce(updateCurrentInput, 350)
    }

    const getFilteredItem = createMemo(()=>{
        if (!props.items)
            return []
        let res = props.items.map((item, i) => ({ 
            text: value ? item[value] : item, 
            value: key ? item[key]: item, 
            icon: iconVal ? item[iconVal]: null, 
            index: i 
        }))
        if (!getCurrentInput() || !getOpen() || props.noFilter != false)
            return res
        return res.filter(item=> item.text.toLowerCase().indexOf(dropdownInput?.value.toLowerCase()) >= 0);
    })

    const updateCurrentInput = ()=>{
        setCurrentInput(dropdownInput?.value)
    }

    const buildDropDownIndicator = createMemo(()=>{
        if (!props.isLoading)
            return <label for="show_more" class={`cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600 ${getOpenIndicatorClass()}`} onClick={()=> toggleOpen() }>
                <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                </label>
        return <CircularProgress color={state().getAccent(state, 'base')} size={6} className="mx-2" />
    })

    return <div class={`relative ${props.className}`}>
      <div class="h-10 bg-white flex border border-gray-200 rounded items-center z-20">
        {
            props.value && props.value.icon &&
            <img className="flex-none pl-1" src={props.value.icon} height={`${ICON_SIZE}px`} /> 
        }
        <input ref={dropdownInput} value={getDisplayValue()} placeholder={props.placeholder} onKeyDown={handleValueChange} name="select" id="select" class="px-2 appearance-none outline-none text-gray-800 flex-auto"
            onFocus={()=> setOpen(true)}
            checked />
        {
            !props.hideClearButton && <button class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600" hidden={!props.value}
                onClick={()=> onItemSelected("", -1, true)}>
                <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        }
        {
            props.appendContent
        }
        {
            buildDropDownIndicator()
        }
      </div>
      {
            <Show when={getOpen()} >
                <div class={`fixed w-full h-full z-10 left-0 select-none ${!props.full ? "":"top-0 left-0"}`} onClick={()=> setOpen(false)} />
                <div class={`${state().getBackground(state)} absolute rounded shadow bg-white overflow-x-hidden overflow-y-auto flex flex-col w-full mt-1 border border-gray-200 z-50`} style="max-height: 520px" ref={listElement}>
                    {
                        props.newItemText && 
                        <Content class="cursor-pointer group">
                            <a class={`block p-2 border-transparent border-l-4 group-hover:border-${state().getAccent(state)} group-hover:bg-gray-100`}
                                onClick={onCreateNew}>
                                
                                <i class="fa fa-plus mr-2" />
                                {props.newItemText}
                            </a>
                        </Content>
                    }
                    <For each={getFilteredItem()}>
                        {
                            (item)=>
                            <Content className="cursor-pointer group">
                                <a class={`flex p-2 border-transparent border-l-4 group-hover:border-${state().getAccent(state)} group-hover:${state().getHoverBackground(state)} overflow-hidden ${getItemClassSelected(item.value)}`}
                                    onClick={()=> onItemSelected(item, item.index)}>
                                    { item.icon && <img className="flex-none pr-1" src={item.icon} height={`${ICON_SIZE}px`} /> }
                                    <span className="flex-auto overflow-hidden">{ item.text }</span>
                                </a>
                            </Content>
                        }
                    </For>
                </div> 
            </Show>
        }
    </div>
}