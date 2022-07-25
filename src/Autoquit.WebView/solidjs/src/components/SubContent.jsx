import NavTitle from "./navs/NavTitle";

export default function SubContent({ onNavigateBack, className, title, children }){
    const goBack = ()=>{
        if (onNavigateBack && onNavigateBack() === false)
            return;
    }

    return <div className={className}>
        <NavTitle onClick={goBack}>
            {title}
        </NavTitle>
        <hr className="mt-1 mb-1" />
        <div className="block pt-4">
            { children }
        </div>
    </div>
}