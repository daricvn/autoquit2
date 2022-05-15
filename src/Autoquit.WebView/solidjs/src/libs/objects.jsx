export const objects = {
    trimFuncs: (jsonObject)=>{
        if (!jsonObject)
            return false;
        var keys = Object.keys(jsonObject)
        if (keys.length == 0)
            return false
        for (let i = 0; i< keys.length; i++)
            if (typeof jsonObject[keys[i]] === 'function')
                delete jsonObject[keys[i]]
        return true
    }
}