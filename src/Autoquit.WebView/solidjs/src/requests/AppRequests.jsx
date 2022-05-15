import axios from 'axios'
import { ENVIRONMENT } from '../environment/default'

export const AppRequests = {
    getProcesses: ()=>{
        return axios.get(ENVIRONMENT.getUrl('app/processes'))
    }
}