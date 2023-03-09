import IKeyInfo, { Modifiers } from "../models/KeyInfo";

export const KeyMapper: { [key: string]: string } = {
    'Backquote': '`',
    'Minus': '-',
    'Equal': '=',
    'Backslash': '\\',
    'Quote':'\'',
    'Semicolon':',',
    'Slash':'/',
    'Period':'.',
    'Comma':',',
    'BracketLeft':'[',
    'BracketRight':']',
}

 function formatKeyCode(keyCode: string){
    if (keyCode.startsWith("Key"))
        return keyCode.substring(3);
    if (keyCode.startsWith("Digit"))
        return keyCode.substring(5);
    return KeyMapper[keyCode] ?? keyCode;
}

function createModifiers(ctrl: boolean, shift: boolean, alt: boolean)
{
    let res = 0;
    if (shift)
        res |= Modifiers.Shift
    if (ctrl)
        res |= Modifiers.Ctrl
    if (alt)
        res |= Modifiers.Alt
    return res;
}



export const formatKeyBinding = (event: KeyboardEvent) => {
    event.preventDefault()
    let obj : IKeyInfo = {
        code: event.code,
        modifiers: createModifiers(event.ctrlKey, event.shiftKey, event.altKey)
    }
    obj.text = ''
    if (obj.code == "Escape" && !event.ctrlKey && !event.altKey)
        return obj;
    if (obj.code.startsWith("Control") || event.ctrlKey)
        obj.text += "[CTRL]";
    if (obj.code.startsWith("Alt") || event.altKey)
        obj.text += (obj.text ? '+':'') + "[ALT]";
    if (obj.code.startsWith("Shift") || event.shiftKey)
        obj.text += (obj.text ? '+':'') + "[SHIFT]";
    if (obj.code.startsWith("Control") || obj.code.startsWith("Alt") || obj.code.startsWith("Shift")) 
        return obj
    obj.text += (obj.text ? '+':'') + formatKeyCode(obj.code);
    return obj
}