export default interface IKeyInfo {
    code: string;
    modifiers: Modifiers;
    text?: string;
}

export enum Modifiers {
    None = 0,
    Shift = 1,
    Ctrl = 2,
    Alt = 4
}