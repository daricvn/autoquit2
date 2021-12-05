import { useNavigate } from "solid-app-router";
import NavTitle from "./navs/NavTitle";

export default function SubContent(props){
    const navigate = useNavigate()
    return <div className={props.className}>
        <NavTitle onClick={()=> navigate('/')}>
            {props.title}
        </NavTitle>
        <hr className="mt-1 mb-1" />
        <div className="block pt-4">
            { props.children }
        </div>
    </div>
}