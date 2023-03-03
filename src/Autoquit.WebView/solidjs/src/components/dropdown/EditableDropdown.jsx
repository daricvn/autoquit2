import { list } from "postcss"
import { debounce } from "@solid-primitives/scheduled"
import { createMemo, createSignal, createEffect, For, Show } from "solid-js"
import CONSTVAR from "../../libs/Const"
import { useGlobalState } from "../../store"
import Content from "../forms/Content"
import CircularProgress from "../progress/CircularProgress"

const ICON_SIZE = 56;

export default function EditableDropdown(props){
    const [ getOpen, setOpen ] = createSignal(false)
    const [ getCurrentInput, setCurrentInput ] = createSignal()
    const [ getHoverIndex, setHoverIndex ] = createSignal(-1)
    const debounceUpdate = debounce((method)=> method(), 350);
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
        debounceUpdate(updateCurrentInput);
    }

    const onCreateNew = ()=>{
        onItemSelected(CONSTVAR.EmptyStr, -1)
        if (props.onRequest)
            props.onRequest()
    }

    const toggleOpen = ()=>{
        if (!props.items || props.disabled)
            return setOpen(false)
        if (getOpen() && props.isLoading)
            return null;
        return setOpen(!getOpen())
    }

    const getItemClassSelected = (data)=>{
        if (!props.value)
            return CONSTVAR.EmptyStr
        if (data == props.value || data == props.value?.value)
            return `border-${state.getAccent(state)}`
        return CONSTVAR.EmptyStr;
    }

    const getOpenIndicatorClass = ()=>{
        if (getOpen())
            return "transform-gpu"
        return "transform-gpu rotate-180"
    }

    const getDisplayValue = createMemo(()=>{
        if (!props.value || !props.items)
            return CONSTVAR.EmptyStr
        if (props.value.value && props.value.text != null)
            return props.value.text
        for (let i= 0; i< props.items.length; i++)
            if (key && value && props.items[i][key] == props.value)
                return props.items[i][value]
            else if (props.items[i] == props.value)
                return props.items[i]
        return CONSTVAR.EmptyStr
    })

    const handleValueChange = (args) => {
        if (props.preventEdit)
            args.preventDefault()
        if (props.onChange)
            props.onChange(dropdownInput.value, -1)
        debounceUpdate(updateCurrentInput)
    }

    const getFilteredItem = createMemo(()=>{
        if (!props.items)
            return CONSTVAR.EmptyArray
        let res = props.items.map((item, i) => ({ 
            text: value ? item[value] : item, 
            value: key ? item[key]: item, 
            icon: iconVal ? item[iconVal]: null, 
            index: i 
        }))
        if (!getCurrentInput() || props.noFilter == true)
            return res
        return res.filter(item=> item.text.toLowerCase().indexOf(getCurrentInput().toLowerCase()) >= 0);
    })

    const updateCurrentInput = ()=>{
        setCurrentInput(dropdownInput?.value)
    }

    const appendItemComponent = (item, i)=>{
        if (props.appendItem)
            return props.appendItem(item, i)
        return CONSTVAR.EmptyStr
    }

    const buildDropDownIndicator = createMemo(()=>{
        if (!props.isLoading)
            return <label for="show_more" class={`cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600 ${getOpenIndicatorClass()}`} onClick={()=> toggleOpen() }>
                <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                </label>
        return <CircularProgress color={state.getAccent(state, 'base')} size={6} className="mx-2" />
    })

    const expandList = createMemo(()=> {
        if (typeof(props.disabled) === 'function')
            return !props.disabled() && getOpen();
        return !props.disabled && getOpen();
    })

    return <div class={`relative ${props.className}`}>
      <div class="h-10 bg-white flex border border-gray-200 rounded items-center z-20">
        {
            props.value && props.value.icon &&
            <img className="flex-none pl-1" src={props.value.icon} height={`${ICON_SIZE}px`} /> 
        }
        <Show when={expandList()}>
            <div class={`fixed w-full h-full z-10 left-0 select-none top-0 left-0`} onClick={()=> setOpen(false)} />
        </Show>
        <input ref={dropdownInput} value={getDisplayValue()} placeholder={props.placeholder} 
            onKeyDown={handleValueChange} 
            onKeyUp={handleValueChange}
            name="select" id="select" class={`px-2 appearance-none outline-none text-gray-800 flex-auto ${!getOpen() ? "" : "z-20"}`}
            onFocus={()=> setOpen(true)}
            disabled={props.disabled}
            checked />
        {
            !props.hideClearButton && <button class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600" hidden={!props.value || props.disabled}
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
            <Show when={expandList()}>
                <div class={`${state.getBackground(state)} absolute rounded shadow bg-white overflow-x-hidden overflow-y-auto flex flex-col w-full mt-1 border border-gray-200 z-50`} style="max-height: 520px" ref={listElement}>
                    {
                        props.newItemText && 
                        <Content class="cursor-pointer group">
                            <a class={`block p-2 border-transparent border-l-4 group-hover:border-${state.getAccent(state)} group-hover:bg-gray-100`}
                                onClick={onCreateNew}>
                                
                                <i class="fa fa-plus mr-2" />
                                {props.newItemText}
                            </a>
                        </Content>
                    }
                    <For each={getFilteredItem()}>
                        {
                            (item, i)=>
                            <Content className={`cursor-pointer border-transparent border-l-4 flex ${getItemClassSelected(item.value)} hover:border-${state.getAccent(state)} hover:${state.getHoverBackground(state)}`}
                                onMouseOver={()=> setHoverIndex(i())} onMouseLeave={()=> setHoverIndex(-1)}>
                                <a class={`flex-auto p-2 flex text-ellipsis select-none overflow-hidden`}
                                    onClick={()=> onItemSelected(item, item.index)}>
                                    { item.icon && <img className="flex-none pr-1" src={item.icon} height={`${ICON_SIZE}px`} /> }
                                    <span className="flex-auto overflow-hidden">{ item.text }</span>
                                </a>
                                <Show when={props.appendItem && getHoverIndex() == i()}>
                                    <div className="pr-1 pt-2">
                                        { appendItemComponent(item, i()) }
                                    </div>
                                </Show>
                            </Content>
                        }
                    </For>
                </div> 
            </Show>
        }
    </div>
}