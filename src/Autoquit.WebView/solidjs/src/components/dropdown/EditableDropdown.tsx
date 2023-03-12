import { debounce } from "@solid-primitives/scheduled"
import { createMemo, createSignal, createEffect, For, Show, JSX } from "solid-js"
import { useGlobalState } from "../../context/GlobalStore";
import Content from "../content/Content";
import CONSTVAR from "../../@static/constVar";
import DropdownIndicator from "./DropdownIndicator";
import DropdownItem from "./DropdownItem";
import IEditableDropdownItem from "./IEditableDropdownItem";

const ICON_SIZE = 56;

export interface IEditableDropdownProps{
    class?: string;
    loading?: boolean;
    onStateChange?: (open: boolean) => void;
    onChange?: (value: IEditableDropdownItem | any, index: number) => void;
    newItemContent?: Element | any;
    onNewItem?: ()=> void;
    dataMember?: string;
    displayMember?: string;
    iconMember?: string;
    items?: any[];
    value?: any;
    position?: 'top' | 'bottom';
    disabled?: boolean;
    noFilter?: boolean;
    disableClearItem?: boolean;
    disableInput?: boolean;
    placeholder?: string;
    selectOnly?: boolean;
    dropdownAppendContent?: Element | any;
    itemAppendContent?: (item: any, index: number) => Element | any;
}

export default function EditableDropdown(props: IEditableDropdownProps){
    const [ getOpen, setOpen ] = createSignal(false)
    const [ getCurrentInput, setCurrentInput ] = createSignal<any>()
    const [ getHoverIndex, setHoverIndex ] = createSignal(-1)
    const debounceUpdate = debounce((method: ()=> void)=> method(), 250);
    const [ state, getState ] = useGlobalState()
    const key = props.dataMember
    const value = props.displayMember
    const iconVal = props.iconMember
    let dropdownInput: HTMLInputElement | undefined;
    let listElement: HTMLDivElement | undefined;

    createEffect(()=>{
        props.onStateChange?.call(null, getOpen())
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
            listElement.style.top = (dropdownInput?.parentElement?.offsetHeight ?? 0) + "px"            
            listElement.style.bottom = ""
        }
    })

    const onItemSelected = (item: any, index: number, retain?: boolean)=>{
        if (props.onChange)
            props.onChange(item, index)
        if (!retain)
            setOpen(false)
        debounceUpdate(updateCurrentInput);
    }

    const onCreateNew = ()=>{
        onItemSelected(CONSTVAR.EmptyStr, -1)
        props.onNewItem?.call(null);
    }

    const toggleOpen = ()=>{
        if (!props.items || props.disabled)
            return setOpen(false)
        if (getOpen() && props.loading)
            return null;
        return setOpen(!getOpen())
    }

    const getSelectedItemClass = (data: any)=>{
        if (!props.value)
            return CONSTVAR.EmptyStr
        if (data == props.value || data == props.value?.value)
            return `border-${state.getAccent}`
        return CONSTVAR.EmptyStr;
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

    const handleKeyDown = (e: KeyboardEvent)=>{
        if (props.disableInput){
            e.preventDefault()
            return;
        }
        handleValueChange(e);
    }

    const handleValueChange = (e: Event) => {
        if (props.selectOnly)
            e.preventDefault()
        if (props.onChange)
            props.onChange(dropdownInput?.value, -1)
        debounceUpdate(updateCurrentInput)
    }

    const getFilteredItem = createMemo(()=>{
        if (!props.items)
            return CONSTVAR.EmptyArray
        let res: IEditableDropdownItem[] = props.items.map((item, i) => ({ 
            index: i,
            text: value ? item[value] : item, 
            value: key ? item[key]: item, 
            icon: iconVal ? item[iconVal]: null
        }))
        if (!getCurrentInput() || props.noFilter == true)
            return res
        return res.filter(item=> item.text.toLowerCase().indexOf(getCurrentInput().toLowerCase()) >= 0);
    })

    const updateCurrentInput = ()=>{
        setCurrentInput(dropdownInput?.value)
    }

    const expandList = createMemo(()=> {
        return !props.disabled && getOpen();
    })

    return <div class={`relative ${props.class}`}>
      <div class="h-10 bg-white flex border border-gray-200 rounded items-center z-20">
        {
            props.value && props.value.icon &&
            <img class="flex-none pl-1" src={props.value.icon} height={`${ICON_SIZE}px`} /> 
        }
        <Show when={expandList()}>
            <div class={`fixed w-full h-full z-10 left-0 select-none top-0 left-0`} onClick={()=> setOpen(false)} />
        </Show>
        <input ref={dropdownInput} value={getDisplayValue()} placeholder={props.placeholder} 
            onKeyDown={handleKeyDown} 
            onKeyUp={handleKeyDown}
            name="select" id="select" class={`px-2 appearance-none outline-none text-gray-800 flex-auto ${!getOpen() ? "" : "z-20"}`}
            onFocus={()=> setOpen(true)}
            disabled={props.disabled}
            checked />
        <Show when={!props.disabled && !props.disableClearItem}> 
            <button class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600" hidden={!props.value || props.disabled}
                onClick={()=> onItemSelected("", -1, true)}>
                <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </Show>
        {
            props.dropdownAppendContent
        }
        <DropdownIndicator loading={props.loading} open={getOpen()} onClick={()=> toggleOpen()} disabled={props.disabled} />
      </div>
      {
            <Show when={expandList()}>
                <div class={`${state.getBackground} absolute rounded shadow overflow-x-hidden overflow-y-auto flex flex-col w-full mt-1 border border-gray-200 z-50`} style="max-height: 520px" ref={listElement}>
                    {
                        props.newItemContent != undefined && 
                        <Content class="cursor-pointer group">
                            <a class={`block p-2 border-transparent border-l-4 group-hover:border-${state.getAccent} group-hover:bg-gray-100`}
                                onClick={onCreateNew}>
                                
                                <i class="fa fa-plus mr-2" />
                                {props.newItemContent}
                            </a>
                        </Content>
                    }
                    <For each={getFilteredItem()}>
                        {
                            (item, i)=>
                            <Content class={`cursor-pointer border-transparent border-l-4 flex ${getSelectedItemClass(item.value)} hover:border-${state.getAccent} hover:${state.getHoverBackground}`}
                                onMouseOver={()=> setHoverIndex(i())} onMouseLeave={()=> setHoverIndex(-1)}>
                                <a class={`flex-auto p-2 flex text-ellipsis select-none overflow-hidden`}
                                    onClick={()=> onItemSelected(item, item.index)}>
                                    { item.icon && <img class="flex-none pr-1" src={item.icon} height={`${ICON_SIZE}px`} /> }
                                    <DropdownItem value={item.text} highlight={props.noFilter ? '' : getCurrentInput()}></DropdownItem>
                                </a>
                                <Show when={props.itemAppendContent && getHoverIndex() == i()}>
                                    <div class="pr-1 pt-2">
                                        { props.itemAppendContent?.call(null, item, i()) }
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