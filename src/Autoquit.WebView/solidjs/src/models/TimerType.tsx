export enum TimerType {
    seconds = "seconds",
    minutes = "minutes",
    hours = "hours"
}

export function convertTimeToNumeric(value: number, type?: TimerType)
{
    switch (type)
    {
        case TimerType.hours:
            return value * 3600;
        case TimerType.minutes:
            return value * 60;
    }
    return value;
}

export function convertNumericToTime(value: number, type?: TimerType)
{
    switch (type)
    {
        case TimerType.hours:
            return value / 3600;
        case TimerType.minutes:
            return value / 60;
    }
    return value;
}

export function formatTimer(value: number)
{
    let h = 0
    let m = 0
    let s = 0
    h = Math.floor(value / 3600)
    m = Math.floor((value - (h * 3600)) / 60)
    s = (value - (h * 3600) - (m * 60))
    return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0")
}