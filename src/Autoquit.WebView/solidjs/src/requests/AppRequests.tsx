import axios from "axios"
import { ENVIRONMENT } from "../configs/default"

export const AppRequests = {
    getProcesses: ()=>{
        return axios.get(ENVIRONMENT.getUrl('app/processes'))
    },
    getLanguage: (target: string)=>{
        return axios.get(ENVIRONMENT.getUrl('app/language?target=' + target))
    },
    getProcessesLazily: ()=>{
        return axios.get(ENVIRONMENT.getUrl('app/lazyprocesses'))
    },
    bringToTop: (id: any)=>{
        return axios.post(ENVIRONMENT.getUrl('app/top'), id)
    },
    close: ()=>{
        return axios.post(ENVIRONMENT.getUrl('app/close'))
    }
}