import { useGlobalState } from "../../store"

export default function Header(props){
    const [ state, getState ] = useGlobalState()

    return <div class={`h-12 bg-${state().getAccent(state)} px-1`}>
        { props.children }
    </div>
}