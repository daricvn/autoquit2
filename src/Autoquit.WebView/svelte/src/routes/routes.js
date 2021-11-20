import { wrap } from 'svelte-spa-router/wrap'
import Main from '../components/Main.svelte'
import Loading from './Loading.svelte'

function lazy(callback){
    return wrap({
        asyncComponent: callback,
        loadingComponent: Loading
    })
}

export const routes = {
    '/': Main,
    '/about': lazy(()=> import("../pages/About/About.svelte")),
    '/settings': lazy(()=> import('../pages/Settings/Settings.svelte'))
}