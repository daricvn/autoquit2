import rosetta from "rosetta";

const i18n = new rosetta({
    "en-UK": {
        "loading": "Loading",
        "delete file": "Delete File"
    }
});
i18n.locale("en-UK")

export default function translate(key){
    var res = i18n.t(key?.toLowerCase())
    if (!res)
        return key;
    return res + ''
}

export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}