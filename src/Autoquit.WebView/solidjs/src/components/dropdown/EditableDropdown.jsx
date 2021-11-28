import { createMemo, createSignal, For } from "solid-js"
import { useGlobalState } from "../../store"

export default function EditableDropdown(props){
    const [ getOpen, setOpen ] = createSignal(false)
    const [ state, getState ] = useGlobalState()
    const key = props.dataMember
    const value = props.displayMember
    let dropdownInput

    const onItemSelected = (item, index, retain)=>{
        if (props.onChange)
            props.onChange(item, index)
        if (!retain)
            setOpen(false)
    }

    const onCreateNew = ()=>{
        onItemSelected("", -1)
        if (props.onRequest)
            props.onRequest()
    }

    const toggleOpen = ()=>{
        if (!props.items)
            return setOpen(false)
        return setOpen(!getOpen())
    }

    const getItemClassSelected = (data)=>{
        if (!props.value)
            return ""
        if (data == props.value)
            return `border-${state.getAccent(state)}`
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
    }

    const getFilteredItem = createMemo(()=>{
        if (!props.items)
            return []
        console.log("Filetered")
        let res = props.items.map((item, i) => ({ content: value ? item[value] : item, data: key ? item[key]: item, index: i }))
        if (!dropdownInput?.value || !getOpen())
            return res
        return res.filter(item=> item.content.toLowerCase().indexOf(dropdownInput?.value.toLowerCase()) >= 0);
    })

    return <div class={`relative ${props.className}`}>
      <div class="h-10 bg-white flex border border-gray-200 rounded items-center z-20">
        <input ref={dropdownInput} value={getDisplayValue()} placeholder={props.placeholder} onKeyDown={handleValueChange} name="select" id="select" class="px-4 appearance-none outline-none text-gray-800 w-full"
            onFocus={()=> setOpen(true)}
            checked />

        <button class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600" hidden={!props.value}
            onClick={()=> onItemSelected("", -1, true)}>
          <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <label for="show_more" class={`cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600 ${getOpenIndicatorClass()}`} onClick={()=> toggleOpen() }>
          <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </label>
      </div>
      {
            getOpen() && 
            <>
            <div class="absolute rounded shadow bg-white overflow-hidden flex flex-col w-full mt-1 border border-gray-200 z-50">
                {
                    props.newItemText && 
                    <div class="cursor-pointer group">
                        <a class={`block p-2 border-transparent border-l-4 group-hover:border-${state.getAccent(state)} group-hover:bg-gray-100`}
                            onClick={onCreateNew}>
                            
                            <i class="fa fa-plus mr-2" />
                            {props.newItemText}
                        </a>
                    </div>
                }
                <For each={getFilteredItem()}>
                    {
                        (item)=>
                        <div class="cursor-pointer group">
                            <a class={`block p-2 border-transparent border-l-4 group-hover:border-${state.getAccent(state)} group-hover:bg-gray-100 ${getItemClassSelected(item.data)}`}
                                onClick={()=> onItemSelected(item.data, item.index)}>
                                { item.content }
                            </a>
                        </div>
                    }
                </For>
            </div> 
            <div class="fixed w-full h-full z-10 left-0 select-none" onClick={()=> setOpen(false)} />
            </>
        }
    </div>
}