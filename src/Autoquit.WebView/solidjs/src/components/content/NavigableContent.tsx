import NavBar from "../nav/NavBar";
import { JSX } from 'solid-js';

export interface IContentProps extends JSX.HTMLAttributes<HTMLDivElement>
{
    onNavigateBack?: () => boolean | any;
}

export default function NavigableContent(props: IContentProps){
    const goBack = ()=>{
        if (props.onNavigateBack && props.onNavigateBack() === false)
            return;
    }

    return <div class={props.class}>
        <NavBar onClick={goBack}>
            {props.title}
        </NavBar>
        <hr class="mt-1 mb-1" />
        <div class="block pt-4">
            { props.children }
        </div>
    </div>
}