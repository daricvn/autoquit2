import rosetta from "rosetta";

const i18n = new rosetta({
    "en-UK": {
        "loading": "Loading",
        "delete file": "Delete File"
    }
});
i18n.locale("en-UK")

export default function translate(key){
    var res = i18n.t(key?.toLowerCase() ?? '')
    if (!res)
        return key;
    return res + ''
}

export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatString() {
        "use strict";
        if (arguments.length == 0)
            return
        var str = arguments[0].toString();
        let arr = Array.prototype.slice.call(arguments, 1)
        if (arr.length) {
            var t = typeof arr[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arr)
                : arr[0];
    
            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }
    
        return str;
    }