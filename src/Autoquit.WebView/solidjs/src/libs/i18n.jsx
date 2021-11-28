import rosetta from "rosetta";

const i18n = new rosetta({
    "en-UK": {
        "Loading": "Loading"
    }
});
i18n.locale("en-UK")

export default function translate(key){
    var res = i18n.t(key)
    if (!res)
        return key;
    return res + ''
}