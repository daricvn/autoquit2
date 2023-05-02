import axios from "axios"
import { ENVIRONMENT } from "../configs/default"

export const ScriptRequests = {
    startRecord: ()=>{
        return axios.get(ENVIRONMENT.getUrl('script/record/start'))
    },
    stopRecord: ()=>{
        return axios.get(ENVIRONMENT.getUrl('script/record/stop'))
    }
}