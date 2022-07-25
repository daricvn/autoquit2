
import { useRoutes } from "solid-app-router";
import { lazy } from "solid-js";
import { Transition } from "solid-transition-group";

export const routes = [
    { path: '/', component: lazy(()=> import("../views/AppPortal"))  },
    { path: '/about', component: lazy(()=> import("../views/About")) }
]

const routeTransition = {
    enter: (el, done)=>{
        const a = el.animate([{ opacity: 0, transform: 'translateX(100px)', position: 'absolute'}, { opacity: 1, transform: 'translateX(0)',  position: 'absolute'}], {
            duration: 300
        })
        a.finished.then(done);
    },
    leave: (el, done)=>{
        const a = el.animate([{ opacity: 1, transform: 'translateX(0)', position: 'absolute'}, { opacity: 0, transform: 'translateX(100px)',  position: 'absolute'}], {
            duration: 100
        })
        a.finished.then(done);
    }
}

export default function MainRoutes(){
    const Routes = useRoutes(routes)
    return <Transition onEnter={routeTransition.enter} onExit={routeTransition.leave} appear>
        <Routes />
    </Transition>
}