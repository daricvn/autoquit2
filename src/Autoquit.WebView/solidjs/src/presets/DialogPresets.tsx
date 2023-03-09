export interface IDialogButton {
    yes: string;
    no?: string;
    cancel: string;
}

export interface IDialogPreset {
    show: boolean;
    text?: string;
    type: DialogButtonPresetName;
    showCancel?: boolean;
    accept?: ()=> void;
    reject?: ()=> void;
}

export enum DialogButtonPresetName {
    OkCancel = 0,
    YesNo = 1,
    ConfirmCancel = 2,
    YesNoCancel = 3 
}

export const DialogButtonPresets : { [key: number]: IDialogButton } = {
    [DialogButtonPresetName.OkCancel]: { yes: "Ok", cancel: "Cancel" },
    [DialogButtonPresetName.YesNo]: { yes: "Yes", cancel: "No" },
    [DialogButtonPresetName.ConfirmCancel]: { yes: "Confirm", cancel: "Cancel" },
    [DialogButtonPresetName.YesNoCancel]: { yes: "Yes", no: "No", cancel: "Cancel" },
}

export const getDialogButton = (type?: number)=>{
    return DialogButtonPresets[type ?? DialogButtonPresetName.OkCancel];
}