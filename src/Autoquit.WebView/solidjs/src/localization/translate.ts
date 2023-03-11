import rosetta from "rosetta";

const i18n : any = rosetta({
    "en-UK": {
        "loading": "Loading",
        "delete file": "Delete File"
    }
});
i18n.locale("en-UK")

export default function translate(key?: string | any){
    var res = i18n.t(key?.toLowerCase() ?? '')
    if (!res)
        return key;
    return res + ''
}

export function updateLanguage(key: string, json: any) {
    i18n.set(key, json)
}

export function capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatString(str?: string, ...args: any[]) {
        if (args == null || args.length == 0)
            return str
        for (let i = 0; i < args.length; i++) {
            str = str?.replace(new RegExp("\\{" + i + "\\}", "gi"), args[i]);
        }
        return str;
    }