import axios from 'axios'
import { ENVIRONMENT } from '../environment/default'

export const AppRequests = {
    getProcesses: ()=>{
        return axios.get(ENVIRONMENT.getUrl('app/processes'))
    },
    getProcessesLazily: ()=>{
        return axios.get(ENVIRONMENT.getUrl('app/lazyprocesses'))
    },
    bringToTop: (id)=>{
        return axios.post(ENVIRONMENT.getUrl('app/top'), id)
    }
}