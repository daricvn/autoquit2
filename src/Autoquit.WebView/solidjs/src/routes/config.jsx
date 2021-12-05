
import { useRoutes } from "solid-app-router";
import { lazy } from "solid-js";
import { Transition } from "solid-transition-group";

export const routes = [
    { path: '/', component: lazy(()=> import("../views/AppPortal"))  },
    { path: '/about', component: lazy(()=> import("../views/About")) },
    { path: '/settings', component: lazy(()=> import("../views/Settings")) },
]

export default function MainRoutes(){
    const Routes = useRoutes(routes)
    return <Transition name="route-fade">
        <Routes />
    </Transition>
}