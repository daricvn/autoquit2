import NavTitle from "./navs/NavTitle";

export default function SubContent(props){
    //const { onNavigateBack, className, title, children } = props./
    const goBack = ()=>{
        if (props.onNavigateBack && props.onNavigateBack() === false)
            return;
    }

    return <div className={props.className}>
        <NavTitle onClick={goBack}>
            {props.title}
        </NavTitle>
        <hr className="mt-1 mb-1" />
        <div className="block pt-4">
            { props.children }
        </div>
    </div>
}