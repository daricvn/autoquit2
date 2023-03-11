export enum RepeatType {
    None = "none",
    Times = "times",
    Timer = "timer"
}

export const RepeatInfo : { [ key: string ]: string } = {
    [RepeatType.Timer]: "Remaining time: {0}",
    [RepeatType.Times]: "Remaining: {0} time(s)"
}